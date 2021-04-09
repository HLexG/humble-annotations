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
    SaveMentions: async function (annotations, id, tokens){
        //console.log(mentiondata);
        console.log('helloo');
        console.log(annotations);
        /*
                                            'cluster_id': annotations['mentions'][0]['cluster_id'],
                                            'document_id': annotations['mentions'][0]['document_id'],
                                            'end_token_id': annotations['mentions'][0]['end_token_id'],
                                            'id': annotations['mentions'][0]['id'],
                                            'sentence_id': annotations['mentions'][0]['sentence_id'],
                                            'start_token_id': annotations['mentions'][0]['start_token_id']
                                        */
        return await axios.post(BASE_API_URL+"/mentions", {'dataset_id': 1, 'document_id':tokens[0]['document_id'],'sentence_id': annotations['mentions'][0]['sentence_id'],
                                        'start_token_id': annotations['mentions'][0]['start_token_id'],
                                        'end_token_id': annotations['mentions'][0]['end_token_id'],
                                        'cluster_id': 2}).then((response) => {
                                                                console.log(response);
                                                                    }, (error) => {
                                                                console.log(error);
                                                                });
                                                        }, 
    SaveClusters: async function (annotations){
        
        return await axios.post(BASE_API_URL+"/clusters", {'document_id':parseInt(annotations['mentions'][0]['document_id'],10),'cluster_name':'M1'});
    }
}

export default DataServices;