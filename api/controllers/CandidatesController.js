/**
 * CandidatesController
 *
 * @description :: Server-side logic for managing Candidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async list(req, res) {
        const candidates = await Candidates
            .find()
            .populate('election');

        const vote_count = await ElectionService.countTotalVotes(1);

        // get candidates' individual vote count
        return res.view('vote', { 
            candidates, vote_count 
        });
    },

    async save(req, res) {
        try {
            const { fullname, election } = req.body;
            const lastCandidate = await Candidates.findOne({ 
                election
            }).sort('dataBlock DESC');
            
            if (lastCandidate.datablock === 4096) {
                throw new Error('You can\'t add more than 4 candidates for a polition');
            }

            const datablocks = [1, 16, 256, 4096];
            const index = datablocks.indexOf(lastCandidate.dataBlock);
            const dataBlock = index ? datablocks[index + 1] : 1;
            
            await Candidates.create({ 
                fullname, 
                election, 
                dataBlock 
            });
            return res.redirect('/admin/result/' + election);
        } catch (err) {
            return res.serverError(err.message);
        }
    }
};