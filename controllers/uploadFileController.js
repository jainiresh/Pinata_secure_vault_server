import KeyMetadata from "../model/KeyMetadata.js";
import PinataDetails from "../model/PinataDetails.js";
import { uploadFileViaWeb3 } from "../service/pinataService.js";
import { decryptAesKey, encryptFileWithAES } from "../utils/cryptoUtils.js";

export async function uploadFileController(req, res, next){
    try {
        const id = req.body.id;
        const file = req.file;

    

        if (!file || !id) {
            return res.status(400).json({ error: 'File, id are required' });
          }

        const keyMetadata = await KeyMetadata.findOne({_id: id});
        if(!keyMetadata){
            return res.status(500).json({error : `The key metadata for this user is not found !`})
        }

        const pureAesKey = Buffer.from(keyMetadata.encryptedAesKey, 'base64'); // Convert from base64
        const iv = Buffer.from(keyMetadata.iv, 'base64'); // Convert IV from base64
        
        const fileContent = file.buffer;

        const decryptedAesKey = decryptAesKey(pureAesKey, keyMetadata.privateKey);
        const encryptedFileContent = encryptFileWithAES(fileContent, decryptedAesKey, iv);

        const {pinataGateway, pinataCid} = await uploadFileViaWeb3({
            arrayBuffer: encryptedFileContent
        })

        const fileUrl = pinataGateway + "/" + pinataCid;

        const pinataDetailsModel = new PinataDetails({
            pinataUrl : fileUrl, 
            encryptedAesKey : keyMetadata.encryptedAesKey
        })

        await pinataDetailsModel.save();
        return res.status(200).json({
            message : `File uploaded successfully !`,
            fileUrl
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}