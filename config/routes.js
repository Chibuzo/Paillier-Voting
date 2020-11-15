module.exports.routes = {

    '/': {
        view: 'index'
    },

    '/register': { view: 'register' },

    'GET /cast-vote': 'CandidatesController.list',

    'GET /login': { view: 'login' },

    'POST /login': 'UserController.login',

    'POST /user': 'UserController.signUp',

    'POST /user/login': 'UserController.login',

    'GET /candidate': { view: 'candidate' },

    'POST /candidate': 'CandidatesController.save',

    'POST /cast-vote': 'VoteController.vote',

    '/generate-keys/:id': 'ElectionVoteController.generateKeyParameters',

    'GET /admin/result': 'ElectionVoteController.resultPage',
};
