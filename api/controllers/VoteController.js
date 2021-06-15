/**
 * VoteController
 *
 * @description :: Server-side logic for managing Votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async vote(req, res) {
        const timer = ElectionService.timer('Voting timer');
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
            const duration = timer.stop();
            return res.json({ 
                status: 'success', 
                cipherText,
                duration 
            });
        } catch (err) {
            console.log(err)
            return res.json({ 
                status: 'error', 
                message: err.message 
            });
        }
    }
};

