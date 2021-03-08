import DataServices from "../../services/DataServices";

export const handleApplyFeatureExtraction = (state) => {

    if(state["featureExtractor"] == "feature-extractor-01"){
        // Get annotations from feature extractor
        DataServices.FeatureExtractor01FindMentions(state["document"]["text"])
            .then(function (response) {
                //console.log(response.data);
                let annotations = response.data;

                // Create a mention id
                //annotations["mentions"].map(mention => mention.cluster_id);
                //annotations["mentions"] = annotations["mentions"].map((mention,idx) => ({ ...mention, id:idx }));
                annotations["mentions"].forEach((m, m_idx) => {
                    m["id"] = m_idx;
                    if(m["start_token_id"] > m["end_token_id"]){
                        m["end_token_id"] = m["start_token_id"];
                    }
                })
                
                // Get the clusters
                annotations["clusters"] = [...new Set(annotations["mentions"].map(mention => mention.cluster_id))];
                annotations["clusters"] = annotations["clusters"].map((cluster,idx) => ({ id:cluster, name: 'M'+cluster }));
                //console.log(annotations);

                state["setAnnotations"](annotations);
            })
    }
    if(state["featureExtractor"] == "feature-extractor-02"){

    }


    state["setOpenFeatureExtractorDialog"](false);
  };