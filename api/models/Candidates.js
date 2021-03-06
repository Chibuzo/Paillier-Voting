/**
 * Candidates.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        fullname: {
            type: 'string'
        },

        election: {
            model: 'electionvote'
        },

        position: {
            type: 'string'
        },

        dataBlock: {
            type: 'integer',
            defaultsTo: 0
        },

        photo: {
            type: 'string'
        }
    }
};

