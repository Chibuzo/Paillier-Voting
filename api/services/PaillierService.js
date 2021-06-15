const paillier = require('paillier-js');
const bigInt = require("big-integer");


const computeVote = async ({ user, candidate: candidateId, election: electionId }) => {
    // prevent multiple voting
    const initialVote = await Vote.findOne({ 
        user, 
        election: electionId 
    });
    if (initialVote) {
        return null;
    }

    const { publicKey, candidates, result } = await getElectionKeys(electionId);
    const candidateDataBlock = candidates.find(candidate => candidate.id == candidateId).dataBlock;
    const public_key = recreatePubKey(JSON.parse(publicKey));
    const cipherText = public_key.encrypt(bigInt(candidateDataBlock));
    
    await Vote.create({ user, election: electionId, vote: String(cipherText) });
    await updateTotalVotes(electionId, cipherText, public_key, result);

    return String(cipherText);
}

const updateTotalVotes = async (electionId, currentVote, publicKey, initialResult) => {
    const result = publicKey.addition(initialResult, currentVote);
    await ElectionVote.update(electionId, { result: String(result) });
}

const recreatePubKey = ({ n, g }) => {
    return new paillier.PublicKey(n, g);
}

const recreatePrivKey = ({ lambda, mu, p, q }, publicKey) => {
    return new paillier.PrivateKey(lambda, mu, p, q, publicKey);
}

const getElectionKeys = async electionId => {
    return ElectionVote.findOne(electionId).populate('candidates', { sort: 'dataBlock ASC' });
}

const decryptResult = async election => {
    const { publicKey, privateKey, result, candidates } = await getElectionKeys(election);

    const privateKeyParams = JSON.parse(privateKey);
    const public_key = recreatePubKey(JSON.parse(publicKey))
    const private_key = recreatePrivKey(privateKeyParams, public_key);

    const decryptedResult = private_key.decrypt(result);
    return { 
        decryptedResult, 
        result, 
        candidates 
    };
}

const breakupResult = (resultBinary, digits, numOfCandidates) => {
    const separateResults = [];
    let offset = length = 0;
    resultBinary = resultBinary.padStart(16, '0'); // this only works for bitLength = 2048, four data blocks
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
    return separateResults;
}

const sumResult = async (election, publicKey, privateKey) => {
    const votes = await Vote.find({ election });

    const result = votes.reduce((voteSum, vote) => {
        return publicKey.addition(voteSum, JSON.parse(vote.vote));
    }, JSON.parse(votes[0].vote));

    return privateKey.decrypt(result);
}

module.exports = {
    computeVote,
    breakupResult,
    recreatePubKey,
    decryptResult
}