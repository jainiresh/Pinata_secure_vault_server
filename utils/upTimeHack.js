import axios from 'axios'
import { appConfig } from '../config/appConfig.js';

const pingUrl = async() => {
    try{
        await axios.get(appConfig.SELF_URL+"/users/list");
        console.log(`Pinged url :${appConfig.SELF_URL} at ${new Date()} , Server is alive`);
    }
    catch(err){
        console.error("Errored in pinging the url" , appConfig.SELF_URL);
    }
}

pingUrl();
export default pingUrl