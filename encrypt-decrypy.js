const crypto = require('crypto');
const { buffer } = require('stream/consumers');
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)


const encryptData = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let crypt = cipher.update(text, 'utf-8', 'hex')
    crypt += cipher.final('hex')

    return {
        iv: iv.toString('hex'),
        encrypted: crypt
    }
}
const encrypRes = encryptData('sakib22')
console.log(encrypRes)

const decrypt = (encryptedData, ivHex) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'))
    let decrypt = decipher.update(encryptedData, 'hex', 'utf-8')
    decrypt += decipher.final('utf-8')
    return decrypt
}

console.log(decrypt(encrypRes.encrypted,encrypRes.iv));