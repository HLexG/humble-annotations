import { BASE_API_URL } from "./Common";
import { authHeader } from "./AuthService";
import PreAnnotation from "./PreAnno";

const axios = require('axios');


// TODO: Add the POST endpoints, 2 step process, first title and description and then another POST to upload the zip
const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    GetUseProfile: async function (username) {
        return await axios.get(BASE_API_URL + "/profile/" + username, { headers: authHeader() });
    },
    GetDatasets: async function () {
        return await axios.get(BASE_API_URL + "/datasets", { headers: authHeader() });
    },
    UploadDatasetInfo: async function (ds_info) {
        return await axios.post(BASE_API_URL + "/datasets", ds_info, { headers: authHeader() });
    },
    UploadDataset: async function (dataset_id, ds) {
        var formData = new FormData();
        formData.append("file", ds);
        var outputs = await axios.post(BASE_API_URL + "/datasets/" + dataset_id + "/upload", formData, { headers: authHeader() });
        // Post-upload pre-annotation services go here
        //PreAnnotation.RunSpanBertSpacy(dataset_id)
        //PreAnnotation.RunEventTriggers(dataset_id)

        return outputs;
    },
    GetDataset: async function (id) {
        return await axios.get(BASE_API_URL + "/datasets/" + id, { headers: authHeader() });
    },
    GetDocuments: async function (dataset_id) {
        return await axios.get(BASE_API_URL + "/documents?dataset_id=" + dataset_id, { headers: authHeader() });
    },
    GetDocument: async function (id) {
        return await axios.get(BASE_API_URL + "/documents/" + id, { headers: authHeader() });
    },
    GetDocumentAnnotations: async function (document_id, annotation_type) {
        return await axios.get(BASE_API_URL + "/annotations/?document_id=" + document_id + "&annotation_type=" + annotation_type, { headers: authHeader() });
    },
    GetDocumentMentions: async function (document_id, annotation_id) {
        return await axios.get(BASE_API_URL + "/mentions/?document_id=" + document_id + "&annotation_id=" + annotation_id, { headers: authHeader() });
    },
    CopyAnnotations: async function (annotation_id, annotation_type) {
        return await axios.post(BASE_API_URL + "/annotations/" + annotation_id + "/copy?annotation_type=" + annotation_type, {}, { headers: authHeader() });
    },
    GetMentions: async function (id) {
        return await axios.get(BASE_API_URL + "/mentionsdoc/" + id, { headers: authHeader() });
    },
    GetCDECRSupport: async function (cluster_id) {
        return await axios.get(BASE_API_URL + "/ev_cl_mentions/" + cluster_id, { headers: authHeader() });
    },
    GetWDSummary: async function (id) {
        return await axios.get(BASE_API_URL + "/entitylinks_wd/" + id, { headers: authHeader() });
    },
    GetWDNamedEntities: async function (dataset_id) {
        return await axios.get(BASE_API_URL + "/entitylinks_nl/" + dataset_id, { headers: authHeader() });
    },
    GetWDCandidates: async function (mentions) {
        return await axios.get(BASE_API_URL + "/entitylinks_open/" + mentions, { headers: authHeader() });
    },
    PostWDClusterPair: async function (cluster_id, pageid) {
        return await axios.post(BASE_API_URL + "/entitylinks_add/" + cluster_id + '/' + pageid, { headers: authHeader() });
    },
}

export default DataService;