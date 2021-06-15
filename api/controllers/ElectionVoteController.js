/**
 * ElectionVoteController
 *
 * @description :: Server-side logic for managing Electionvotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 const bigInt = require("big-integer");

module.exports = {
    async createElection(req, res) {
        try {
            const election = await ElectionVote.create({ election: req.body.election });

            const { public_keys, private_keys } = CryptoFns.generateKeyDeterminants(128);

            const publicKey = PaillierService.recreatePubKey(public_keys);
            
            const data = {
                publicKey: JSON.stringify(public_keys),
                privateKey: JSON.stringify(private_keys),
                result: String(publicKey.encrypt(bigInt(0)))
            };
            await ElectionVote.update(election.id, data);
            res.json({ status: true });
        } catch(err) {
            console.log(err);
        }
    },

    async electionPage(req, res) {
        try {
            const elections = await ElectionVote.find().populate('candidates');
            return res.view('election', { elections });
        } catch (err) {
            console.log(err);
        }
    },


    async resultPage(req, res) {
        try {
            const timer = ElectionService.timer('Result timer');
            const { electionid } = req.params;
            if (!electionid) throw new Error('No election was selected')

            const { 
                decryptedResult,
                result,
                candidates 
            } = await PaillierService.decryptResult(electionid);
            const rawResult = result;
            
            const numOfCandidates = 4; // number of candidates for this particular election. This does not necessarilly have to be hardcoded
            const subBlock = 8; // key length divided by number of candidates
            const individualResults = PaillierService.breakupResult(decryptedResult.toString(2), subBlock, numOfCandidates);
            const totalVotes = individualResults.reduce((sum, count) => {
                return sum + count;
            });

            const candidateResults = individualResults.map((result, index) => {
                return {
                    candidate: candidates[index],
                    votes: result
                };
            });

            const duration = timer.stop();
            return res.view('admin/result', { 
                rawResult, 
                result: decryptedResult.toString(), 
                totalVotes, 
                candidates: candidateResults,
                duration
            });
        } catch (err) {
            console.log(err);
        }
    }
};