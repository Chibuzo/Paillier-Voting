/**
 * VoteController
 *
 * @description :: Server-side logic for managing Votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async vote(req, res) {
        if (!req.session.userId) {
            return res.json({ 
                status: 'error', 
                message: 'Not authorized' 
            });
        }

        const { candidate, election } = req.body;
        
        const vote = {
            user: req.session.userId,
            candidate,
            election
        };

        try {
            const cipherText = await PaillierService.computeVote(vote);
            return res.json({ 
                status: 'success', 
                cipherText 
            });
        } catch (err) {
            return res.json({ 
                status: 'error', 
                message: err.message 
            });
        }
    }
};

