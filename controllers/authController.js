import KeyMetadata from "../model/KeyMetadata.js";
import crypto from 'crypto';
import { encryptAesKeyWithRSA, generateAesKey, generateIv } from "../utils/cryptoUtils.js"; 

export async function registerUser(req, res, next) {
    try {
        let {email, firstName, lastName, password} = req.body;

        if(!email || !firstName || !lastName)
            return res.status(400).json({error: `Email, firstname and last name required .`})
        console.log(email)

        const existingUser = await KeyMetadata.findOne({email});
        if(existingUser){
          return res.status(500).json({error:`User already exists`});
        }

        const aes = generateAesKey();
        const iv = generateIv();   


        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Standard key size for RSA
            publicKeyEncoding: {
              type: 'spki',  // Public Key format
              format: 'pem', // Output format
            },
            privateKeyEncoding: {
              type: 'pkcs8', // Private Key format
              format: 'pem', // Output format
            },
          });

          const encryptedAesKey = encryptAesKeyWithRSA(aes, publicKey);


        const KeyMetaDataModel = new KeyMetadata({
            email,
            publicKey,
            privateKey,
            encryptedAesKey: encryptedAesKey.toString('base64'),
            iv: iv.toString('base64'),
            firstName, 
            lastName,
            password
        })

        await KeyMetaDataModel.save();

        return res.status(200).json({success: 1, email, privateKey, id: KeyMetaDataModel._id})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          error
      })
    }
}

export async function loginUser(req, res, next) {
  try {
      let {email, password} = req.body;

      if(!email || !password)
          return res.status(400).json({error: `Email, firstname and last name required .`})

      const existingUser = await KeyMetadata.findOne({email});
      if(!existingUser){
        return res.status(500).json({error:`User does not exist`})
      }

      if(password == existingUser.password)
      return res.status(200).json({success: 1, email, privateKey : existingUser.privateKey, id: existingUser._id})
      else
      return res.status(401).json({error:`Password is incorrect`});
  } catch (error) {
      console.log(error);
      return res.status(500).json({
        error
    })
  }
}