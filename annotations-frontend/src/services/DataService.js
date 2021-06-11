import {BASE_API_URL} from "./Common";
import {authHeader} from "./AuthService";

const axios = require('axios');

const DataService = {
    Init: function(){
        // Any application initialization logic comes here
    },
    GetUseProfile : async function(username){
        return await axios.get(BASE_API_URL+"/profile/"+username, { headers: authHeader() });
    },
    // http://dev.humblenlp.com/api/v1/documents?dataset_id=1
    // GetTestData : async function(username){
    //   return await axios.get(BASE_API_URL+"/profile/"+username, { headers: authHeader() });
    // },
}

export default DataService;