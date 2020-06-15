const paillier = require('paillier-js');
const bigInt = require("big-integer");

// create random keys
//const { publicKey, privateKey } = paillier.generateRandomKeys(2048);
const candidates = {
    c1: 1,
    c2: 16,
    c3: 256,
    c4: 4096
};

const saveVote = async ({ user, candidate, election }) => {
    const { publicKey, id } = await getElectionKeys(election);
    const cipherText = publicKey.encrypt(bigInt(candidates[candidate]));

    Vote.create({ user, election, vote: cipherText });
    return cipherText;
}

const getElectionKeys = async election => {
    return ElectionVote.findOne({ election }).populate('candidates');
}

const sumResult = async election => {
    const votes = await Vote.find({ election });
    return votes.reduce((voteSum, vote) => {
        return voteSum = publicKey.addition(voteSum + vote);
    });
}

const decryptResult = async election => {
    const { publicKey, privateKey, candidates } = await getElectionKeys(election);

    const encryptedSum = sumResult(election);
    const decryptedResult = privateKey.decrypt(encryptedSum);
    const resultBinary = decryptedResult.toString(2);
}

const breakupResult = (resultBinary, digits, numOfCandidates) => {
    const separateResults = [];
    let offset = length = 0;
    for (let i = 0; i < numOfCandidates; i++) {
        if (resultBinary.length > numOfCandidates) {
            if (i === 0) {
                separateResults.push(parseInt(resultBinary.slice(-digits), 2));
                offset = digits;
                length = offset + digits;
            } else {
                separateResults.push(parseInt(resultBinary.slice(-length, -offset), 2));
                offset += digits;
                length += digits;
            }
        }
    }
    if (separateResults[numOfCandidates - 1].length < digits) {
        separateResults[numOfCandidates - 1] = separateResults[numOfCandidates - 1].padStart(digits, '0');
    }
    console.log(resultBinary)
    console.log(separateResults);
}


module.exports = {
    saveVote,
    breakupResult
}