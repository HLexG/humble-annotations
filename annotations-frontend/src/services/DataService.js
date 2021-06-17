import {BASE_API_URL} from "./Common";
import {authHeader} from "./AuthService";

const axios = require('axios');


// TODO: Add the POST endpoints, 2 step process, first title and description and then another POST to upload the zip
const DataService = {
    Init: function(){
        // Any application initialization logic comes here
    },
    GetUseProfile : async function(username){
        return await axios.get(BASE_API_URL+"/profile/"+username, { headers: authHeader() });
    },
    GetDatasets : async function(){
        return await axios.get(BASE_API_URL+"/datasets", { headers: authHeader() });
    },
    UploadDatasetInfo : async function(ds_info){
        return await axios.post(BASE_API_URL+"/datasets", ds_info, { headers: authHeader() });
    },
    UploadDataset : async function(dataset_id, ds){
        var formData = new FormData();
        formData.append("file", ds);
        return await axios.post(BASE_API_URL+"/datasets/"+dataset_id+"/upload", ds, { headers: authHeader() });
    },
    GetDataset : async function(id){
        return await axios.get(BASE_API_URL+"/datasets/"+id, { headers: authHeader() });
    },
    GetDocuments : async function(dataset_id){
        return await axios.get(BASE_API_URL+"/documents?dataset_id="+dataset_id, { headers: authHeader() });
    },
    GetDocument : async function(id){
        return await axios.get(BASE_API_URL+"/documents/"+id, { headers: authHeader() });
    },
}

export default DataService;