



const axios = require('axios');


const PreAnnotation = {
    Init: function(){
        // Any application initialization logic comes here
    },
    RunSpanBertSpacy : async function(dataset_id){
        return await axios.get(`http://0.0.0.0:9111/v1/process_dataset/${dataset_id}`, { responseType: 'application/json' });
    },
    RunEventTriggers : async function(dataset_id){
        return await axios.get(`http://0.0.0.0:9013/v1/process_dataset_event/${dataset_id}`,{ responseType: 'application/json' });
    },

    }

export default PreAnnotation;