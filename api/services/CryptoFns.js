'use strict';
const crypto = require('crypto');
const bigInt = require('big-integer');

bigInt.rand = function (bitLength) {
    let bytes = bitLength / 8;
    let buf = Buffer.alloc(bytes);
    crypto.randomFillSync(buf);
    buf[0] = buf[0] | 128;  // first bit to 1 -> to get the necessary bitLength
    return bigInt.fromArray([...buf], 256);
};

bigInt.randBetween = function (start, end) {  // crypto rand in [start, end]
    let interval = end.subtract(start);
    let arr = interval.toArray(256).value;
    let buf = Buffer.alloc(arr.length);
    let bn;
    do {
        crypto.randomFillSync(buf);
        bn = bigInt.fromArray([...buf], 256).add(start);
    } while (bn.compare(end) >= 0 || bn.compare(start) < 0);
    return bn;
};

bigInt.prime = function (bitLength) {
    let rnd;
    do {
        rnd = bigInt.rand(bitLength);
        console.assert(rnd.bitLength() == bitLength, 'ERROR: ' + rnd.bitLength() + ' != ' + bitLength);
    } while (!rnd.isPrime());
    return bigInt(rnd);
};

bigInt.prototype.bitLength = function () {
    let bits = 1;
    let result = this;
    const two = bigInt(2);
    while (result.greater(bigInt.one)) {
        result = result.divide(two);
        bits++;
    }
    return bits;
};

function getGenerator(n, n2 = n.pow(2)) {
    const alpha = bigInt.randBetween(2, n);
    const beta = bigInt.randBetween(2, n);
    return alpha.multiply(n).add(1).multiply(beta.modPow(n, n2)).mod(n2);
}

function L(a, n) {
    return a.subtract(1).divide(n);
}

const generateKeyDeterminants = (bitLength) => {
    let p, q, n, n2, g, lambda, mu;

    do {
        p = bigInt.prime(bitLength / 2);
        q = bigInt.prime(bitLength / 2);
        n = p.multiply(q);
    } while (q.compare(p) == 0 || n.bitLength() != bitLength);

    n2 = n.pow(2);

    g = getGenerator(n, n2);
    lambda = bigInt.lcm(p.subtract(1), q.subtract(1));
    mu = L(g.modPow(lambda, n2), n).modInv(n);

    return {
        public_keys: { n, g },
        private_keys: { lambda, mu, p, q }
    };
}

module.exports = { generateKeyDeterminants };