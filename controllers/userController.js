import KeyMetadata from "../model/KeyMetadata.js"

export async function listUserController(req, res, next ){
    try {
        const userList = await KeyMetadata.find();
       
        const userListResponse = userList.map(user => {
            return {
                firstName:  user.firstName,
                lastName : user.lastName,
                publicKey : user.publicKey,
                email : user.email,
                id : user.id
            }

        });

        return res.status(200).json({data: userListResponse});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}