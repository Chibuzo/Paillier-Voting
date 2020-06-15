/**
 * Election.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        election_type: {
            type: 'string'
        },

        // candidates: {
        //     collection: 'candidates',
        //     via: 'election'
        // }
    }
};

