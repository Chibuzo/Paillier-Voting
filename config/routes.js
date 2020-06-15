module.exports.routes = {

    '/': {
        view: 'index'
    },

    '/register': { view: 'register' },

    '/vote': { view: 'vote' },

    'GET /login': { view: 'login' },

    'POST /login': 'UserController.login',

    'POST /user': 'UserController.signUp',

    'POST /user/login': 'UserController.login',

    'POST /vote': 'VoteController.vote',
};
