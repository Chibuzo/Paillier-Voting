// import paillier
const paillier = require('paillier-js');
var bigInt = require("big-integer");

// const candidates = {
//     c1: 1,
//     c2: 16,
//     c3: 256,
//     c4: 4096
// };

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
console.log('starts...');
// create random keys
const { publicKey, privateKey } = paillier.generateRandomKeys(2048);
console.log('Keys created');
console.log(publicKey)
console.log({publicKey})
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
console.log({c8})
console.log({c7})

//let encryptedSum = publicKey.addition(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
let encryptedSum = publicKey.addition(0, c8);
console.log({encryptedSum})
 
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
