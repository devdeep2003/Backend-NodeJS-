const crypto = require("crypto");

// 1. random crypto bytes

const randomBytes = crypto.randomBytes(10).toString("hex");
console.log(randomBytes);

// 2. Hashing a String

const name  = "Cristiano Ronaldo"
const hashName = crypto.createHash("sha256").update("Cristiano Ronaldo").digest("hex");

console.log(hashName === crypto.createHash("sha256").update(name).digest("hex") ? "Login Successfully" : "Internal Server Error")


//Theory about crypto library
// The crypto library in Node.js provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
// It is designed to be a simple and easy-to-use API for performing cryptographic operations in Node.js applications.
// The library is built into Node.js, so you don't need to install any additional packages to use it.
// It is important to note that while the crypto library provides a high level of security, it is still essential to follow best practices when implementing cryptographic functions in your applications.
//We generally use bcrypt library to carry out cryptographic hashing and salting of passwords because it is specifically designed for securely hashing passwords and includes built-in mechanisms to protect against common attacks such as rainbow table and brute force attacks and is lighter than the native crypto library.