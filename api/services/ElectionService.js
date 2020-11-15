const countTotalVotes = async election => Vote.count({ election });

module.exports = {
    countTotalVotes
}