// import paillier
const paillier = require('paillier-js');
var bigInt = require("big-integer");

var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};

// 4 candidates
// 10 voters 

var t = timer('Start');
// create random keys
const { publicKey, privateKey } = paillier.generateRandomKeys(2048);

const m1 = bigInt(16);    // C
const m2 = bigInt(16);    // C
const m3 = bigInt(16);    // C
const m4 = bigInt(4096);  // A
const m5 = bigInt(4096);  // A
const m6 = bigInt(4096);  // A
const m7 = bigInt(256);   // B
const m8 = bigInt(1);     // D
const m9 = bigInt(1);     // D
const m10 = bigInt(16);    // C

// encrypt m
let c1 = publicKey.encrypt(m1);
let c2 = publicKey.encrypt(m2);
let c3 = publicKey.encrypt(m3);
let c4 = publicKey.encrypt(m4);
let c5 = publicKey.encrypt(m5);
let c6 = publicKey.encrypt(m6);
let c7 = publicKey.encrypt(m7);
let c8 = publicKey.encrypt(m8);
let c9 = publicKey.encrypt(m9);
let c10 = publicKey.encrypt(m10);

let encryptedSum = publicKey.addition(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
 
// decrypt c
let d = privateKey.decrypt(encryptedSum);
 
// homomorphic addition of two chipertexts (encrypted numbers)
// let c1 = publicKey.encrypt(m1);
// let c2 = publicKey.encrypt(m2);
// let encryptedSum = publicKey.addition(c1, c2);
// let sum = privateKey.decrypt(encryptedSum); // m1 + m2
t.stop();

module.exports = {
    d,
    //a: 'here',
    bin: d.toString(2),
    //decrypt: sum,
};
