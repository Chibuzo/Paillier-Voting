/**
 * CandidatesController
 *
 * @description :: Server-side logic for managing Candidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async list(req, res) {
        try {
            const { electionid } = req.params;
            if (!electionid) throw new Error('No election was selected');
            
            const election = await ElectionVote.findOne(electionid).populate('candidates');    

            const vote_count = await ElectionService.countTotalVotes(electionid);

            // get candidates' individual vote count
            return res.view('vote', { 
                vote_count, election
            });
        } catch (err) {
            console.log(err);
        }
    },

    async save(req, res) {
        try {
            const { fullname, election } = req.body;
            let lastCandidate;
            lastCandidate = await Candidates.findOne({ 
                election
            }).sort('dataBlock DESC');

            if (!lastCandidate) lastCandidate = { dataBlock: 0 };
            
            if (lastCandidate.datablock === Math.pow(2, 24)) {
                throw new Error('You can\'t add more than 4 candidates for a polition');
            }

            const datablocks = [1, Math.pow(2, 8), Math.pow(2, 16), Math.pow(2, 24)];
            const index = datablocks.indexOf(lastCandidate.dataBlock) + 1;
            const dataBlock = index ? datablocks[index] : 1;
            await Candidates.create({ 
                fullname, 
                election, 
                dataBlock 
            });
            return res.redirect('/candidate');
        } catch (err) {
            console.log(err)
            return res.serverError(err.message);
        }
    }
};