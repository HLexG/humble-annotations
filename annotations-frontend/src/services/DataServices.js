const axios = require('axios');

const BASE_API_URL = 'http://0.0.0.0:9000/v1';
const BASE_FEATURE_EXTRACTOR01_URL = "http://0.0.0.0:9010/v1";

//axios.defaults.baseURL = BASE_API_URL;


const DataServices = {
    Init: function(){
        // Any application initialization logic comes here
    },
    GetDatasets : async function(){
        return await axios.get(BASE_API_URL+"/datasets");
    },
    GetDocumentsForAnnotation : async function(dataset_id){
        return await axios.get(BASE_API_URL+"/documents?dataset_id="+dataset_id);
    },
    GetDocument : async function(id){
        return await axios.get(BASE_API_URL+"/documents/"+id);
    },
    FeatureExtractor01FindMentions: async function(text){
        return await axios.post(BASE_FEATURE_EXTRACTOR01_URL+"/find_mentions",{'text':text});
    },
}

export default DataServices;