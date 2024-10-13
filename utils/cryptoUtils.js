import crypto from 'crypto';


export function generateAesKey() {
    return crypto.randomBytes(32); // AES-256 uses a 32-byte key
}

export function generateIv(){
    return crypto.randomBytes(16);
}

export function encryptAesKeyWithRSA(aesKey, publicKey) {
    return crypto.publicEncrypt({
      key: publicKey, 
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
  aesKey);
  }

  export function decryptAesKey(encryptedAesKey, privateKey) {
    return crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,  // Ensure OAEP padding is used
        oaepHash: 'sha256', // Use the same hash algorithm as in encryption
      },
      encryptedAesKey
    );
  }

export function encryptFileWithAES(buffer, aesKey, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encrypted = cipher.update(buffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted;
  }

 export function decryptFileWithAES(encryptedBuffer, aesKey, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }

export function createPrivateKey(privateKeyPem){
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return privateKey;
}

export function decryptAesKeyWithRSA(encryptedAesKey, privateKey) {
    return crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,  // Ensure OAEP padding is used
      oaepHash: 'sha256', // Use the same hash algorithm as in encryption
    }, encryptedAesKey);
  }