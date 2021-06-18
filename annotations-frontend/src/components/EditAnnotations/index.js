import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Annotation  from '../Annotation';
import AnnotationPanel from '../AnnotationPanel';
import DataService from '../../services/DataService';
import styles from './styles';
import {handleApplyFeatureExtraction, ClearAnnotations} from './handlers';



const EditAnnotations = ( props ) => {
    const {classes} = props;
    const { history } = props;

    const { match: { params } } = props;

    console.log(`Param docs ${params}`)
    


    console.log("================================== EditAnnotations ======================================");
    console.log(props);

    
    const [tokens , setTokens] = useState([]);
    const [annotations , setAnnotations] = useState(null);
    const [openFeatureExtractorDialog , setOpenFeatureExtractorDialog] = useState(false);
    const [featureExtractor , setFeatureExtractor] = useState(null);

    const exResult = ['this','is', 'my', 'example'];
    const result = exResult;
    


    // Component States
    const [id , setId] = useState(params.id);
    const [document , setDocument] = useState(null);
    
    const loadDocument = (id) => {
        DataService.GetDocument(params.id)
            .then(function (response) {
                setDocument(response.data);
                console.log(`Token data: ${JSON.stringify(response['data']['tokens'].token_text)}`)
                console.log(`Gen. data: ${JSON.stringify(response['data'])}`)

                setTokens(response['data']['tokens'])

                const result = response['data']['tokens'].filter(function(element) {
                    return element.key == 'token_text';
                });
            })
    }

    /*annoClose = this.annoClose.bind(this);

    function annoClose(e) {
        e.stopPropagation();
        this.setState({
            annotations: null
        });
      }*/



    // State holder for reference in handlers
    let state = {
        "document": document,
        /*"tokens": tokens,
        "annotations": annotations,
        "setAnnotations": setAnnotations,*/
        "featureExtractor":featureExtractor,
        "setFeatureExtractor":setFeatureExtractor,
        "openFeatureExtractorDialog":openFeatureExtractorDialog,
        "setOpenFeatureExtractorDialog":setOpenFeatureExtractorDialog
    }

    /*setMentionLog = (mention) => {
        if(selectedMention && (selectedMention.id === mention.id) && (selectedMention.sentence_id === mention.sentence_id)){
            style = selectedStyle;
            console.log(mention.id);
            console.log(mention.sentence_id);
        };
    };

    */
    // Setup Component
    useEffect(() => {
        if(props.match.params.id){
            setId(props.match.params.id);
        }
      }, []);

    useEffect(() => {
        if(id){
            loadDocument(id);
        }
      }, [id]);
    useEffect(() => {
        if(document){
            //setTokens(document["tokens"]);
            //setAnnotations(document["annotations"]);
        }
      }, [document]);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Button onClick={loadDocument}></Button>
                <Box display="flex" p={1} className={classes.toolbar}>
                    <Box p={1}>
                        <span className={classes.toolbartitle}>Document: </span>
                        {document && (
                            <span className={classes.toolbartext}>{document.document_name}</span>
                        )}
                    </Box>
                    <Box p={1}>
                        <span className={classes.toolbartitle}>Sentences:</span>
                        <select className={classes.toolbarselect} onChange={() => {}}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <select className={classes.toolbarselect} onChange={() => {}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </Box>
                    <Box p={1} variant="contained" onClick={()=>{loadDocument(id)}} color="primary">
                        <div style={{fontSize:25}}>🤭</div>
                        </Box>  

                    <Box p={1} variant="contained" onClick={()=>{}} color="primary">
                        <div style={{fontSize:25}}>X</div>
                        </Box>      
                    
                    <Box p={1} flexGrow={1}>

                    </Box>
                    <Box p={1} onClick={()=>{setOpenFeatureExtractorDialog(!openFeatureExtractorDialog)}} className={classes.pointer}>
                        <Icon className={classes.toolbaricon}>grading</Icon>
                    </Box>
                    <Box p={1} className={classes.pointer} onClick={()=>{console.log('annotations sent:');console.log(annotations["mentions"]); DataService.SaveClusters(annotations);}}>
                        <Icon className={classes.toolbaricon}>save</Icon>
                    </Box>
                    <Box p={1} className={classes.pointer} onClick={()=>{console.log('annotations sent:');console.log(annotations["mentions"]); DataService.SaveMentions(annotations, id, tokens);}}>
                        <Icon className={classes.toolbaricon}>save</Icon>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                
                {/*{ tokens && annotations && (   <Grid item sm={3} tokens={tokens} annotations = {annotations}/> )}*/} 

                <Grid item sm={2}>
                        <AnnotationPanel annotations={annotations}></AnnotationPanel>
                        </Grid>
                {tokens.map(token =><Grid spacing={5} item id = {id} sm={0.5}>{token.token_text}</Grid>)}
                



                </Grid>
            </main>
            <Dialog open={openFeatureExtractorDialog} onClose={()=>{setOpenFeatureExtractorDialog(false)}}>
                <DialogTitle>Apply Feature Extractor(s)</DialogTitle>
                <DialogContent>
                    <form>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Mentions:</FormLabel>
                        <RadioGroup aria-label="mentiondetection" name="mentiondetection" onChange={(event) => {setFeatureExtractor(event.target.value)}}>
                            <FormControlLabel value="feature-extractor-01" control={<Radio />} label="SpanBERT" />
                            <FormControlLabel value="feature-extractor-02" control={<Radio />} label="SpaCy" />
                        </RadioGroup>
                    </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={()=>{handleApplyFeatureExtraction(state)}} color="primary">
                        Apply
                    </Button>
                    <Button variant="contained" onClick={()=>{setOpenFeatureExtractorDialog(false)}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>            
            


        </div>
    );
    console.log(annotations);
};

export default withStyles( styles )( EditAnnotations );