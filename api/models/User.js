/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        fullname: {
            type: 'string'
        },

        email: {
            type: 'string',
            email: 'true',
            unique: 'true'
        },

        phone: {
            type: 'string'
        },

        gender: {
            type: 'string'
        },

        state: {
            type: 'string'
        },

        password: {
            type: 'string'
        }
    }
};