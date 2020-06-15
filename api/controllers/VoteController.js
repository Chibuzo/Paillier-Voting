/**
 * VoteController
 *
 * @description :: Server-side logic for managing Votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async vote(req, res) {
        const { candidate, election } = req.param;
        const vote = {
            user: req.session.userId,
            candidate,
            election
        };

        const voteStatus = await PaillierService.countVote(vote);
    }
};

