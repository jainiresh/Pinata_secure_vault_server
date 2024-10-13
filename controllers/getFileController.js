import axios from "axios";
import KeyMetadata from "../model/KeyMetadata.js";
import { createPrivateKey, decryptAesKeyWithRSA, decryptFileWithAES } from "../utils/cryptoUtils.js";
import PinataDetails from "../model/PinataDetails.js";

// export async function getFileController(req, res, next){
//     try {
//     const pinataUrl = req.body.pinataUrl;
//     const email = req.body.email;

//     console.log(pinataUrl)

//     const keyMetadata = await KeyMetadata.findOne({email});

//     const response = await axios.get(pinataUrl, { responseType: 'arraybuffer' });
//     const encryptedFileContent = Buffer.from(response.data);
//     const encryptedAesKey = Buffer.from(keyMetadata.encryptedAesKey, 'base64')
//     const iv = Buffer.from(keyMetadata.iv, 'base64')

//     const privateKey = createPrivateKey(keyMetadata.privateKey);
//     const decryptedAesKey = decryptAesKeyWithRSA(encryptedAesKey, privateKey);

//     console.log(decryptedAesKey)
    
//     const decryptedFileContent = decryptFileWithAES(encryptedFileContent, decryptedAesKey, iv) ;

//     res.setHeader('Content-Disposition', `attachment; filename="decrypted-file"`);
//     res.setHeader('Content-Type', 'application/octet-stream');

//     return res.status(200).send(decryptedFileContent);

// } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             error
//         })
//     }
// }

export async function getDecryptedFileController(req, res, next){
    try {
    let {pinataUrl, encryptedAesKey, id} = req.body;


    const response = await axios.get(pinataUrl, { responseType: 'arraybuffer' });
    const encryptedFileContent = Buffer.from(response.data);

    encryptedAesKey = Buffer.from(encryptedAesKey, 'base64')

    let keyMetadata = await KeyMetadata.findOne({_id: id})

    console.log(keyMetadata)
    const iv = Buffer.from(keyMetadata.iv, 'base64')

    let privateKey = createPrivateKey(keyMetadata.privateKey);
    const decryptedAesKey = decryptAesKeyWithRSA(encryptedAesKey, privateKey);

    
    const decryptedFileContent = decryptFileWithAES(encryptedFileContent, decryptedAesKey, iv) ;

    res.setHeader('Content-Disposition', `attachment; filename="decrypted-file"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    return res.status(200).send(decryptedFileContent);

} catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }
}


export async function getFileKeys(req, res, next){
    try {
        let fileKeys = await PinataDetails.find();        
        return res.status(200).json({data : fileKeys})
    } catch (error) {
        return res.status(500).json({error})
    }
}
