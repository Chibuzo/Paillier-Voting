module.exports.routes = {

    '/': {
        view: 'login'
    },

    '/register': { view: 'register' },

    '/logout': 'UserController.logout',

    'GET /cast-vote/:electionid': 'CandidatesController.list',

    'GET /login': { view: 'login' },

    'POST /login': 'UserController.login',

    'POST /user': 'UserController.signUp',

    'POST /user/login': 'UserController.login',

    'GET /candidate': { view: 'candidate' },

    'GET /elections': 'ElectionVoteController.electionPage',

    'POST /create-election': 'ElectionVoteController.createElection',

    'POST /candidate': 'CandidatesController.save',

    'POST /cast-vote': 'VoteController.vote',

    //'/generate-keys/:id': 'ElectionVoteController.generateKeyParameters',

    'GET /admin/result/:electionid': 'ElectionVoteController.resultPage',
};
