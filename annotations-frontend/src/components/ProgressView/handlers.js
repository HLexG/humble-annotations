import DataServices from "../../services/DataServices";

export const handlePullMentions = async () => {
    DataServices.GetMentions().then(function (response){
        let mentions = response.data;
        
        const jsonD = response.data;
        //setMentions(jsonD);

    })};