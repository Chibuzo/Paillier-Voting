/**
 * ElectionVoteController
 *
 * @description :: Server-side logic for managing Electionvotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 const paillier = require('paillier-js');

module.exports = {
	async generateKeyParameters(req, res) {
        if (!req.params.id) return res.badRequest('Provide an ID for the election to generate keys for');
        const electionVote = req.params.id;
        try {
            const { public_keys, private_keys } = CryptoFns.generateKeyDeterminants(2048);
            
            // const { publicKey, privateKey } = paillier.generateRandomKeys(2048)
            // console.log('n: ' + publicKey.n);
            // console.log('g: ' + publicKey.g);
            // console.log('lambda: ' + privateKey.lambda);
            // console.log('mu: ' + privateKey.mu)
            // console.log('q: ', + privateKey._q);
            // const { n, g } = publicKey;
            // const { lambda, mu, _p: p, _q: q } = privateKey;
            
            const data = {
                publicKey: JSON.stringify(public_keys),
                privateKey: JSON.stringify(private_keys),
                result: 0
            };
            await ElectionVote.update(electionVote, data);
            res.ok();
        } catch(err) {
            console.log(err);
        }
    },


    async resultPage(req, res) {
        try {
            const electionId = 1;
            const { 
                decryptedResult,
                result,
                candidates 
            } = await PaillierService.decryptResult(electionId);
            const rawResult = result;
            
            const individualResults = PaillierService.breakupResult(decryptedResult.toString(2), 4, 4);
            const totalVotes = individualResults.reduce((sum, count) => {
                return sum + count;
            });

            const candidateResults = individualResults.map((result, index) => {
                return {
                    candidate: candidates[index],
                    votes: result
                };
            });

            return res.view('admin/result', { 
                rawResult, 
                result: decryptedResult.toString(), 
                totalVotes, 
                candidates: candidateResults 
            });
        } catch (err) {
            console.log(err);
        }
    }
};