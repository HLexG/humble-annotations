import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';

import Annotations from './Annotations';
import AnnotationPanel from './AnnotationPanel';
import DataService from '../../services/DataService';
import { useEnumContext } from "../../services/EnumService";
import { useAuthContext } from "../../services/AuthService";
import styles from './styles';
import { handleApplyFeatureExtraction, ClearAnnotations } from './handlers';



const EditAnnotations = (props) => {
    const { classes } = props;
    const { history } = props;

    let id = props.match.params.id;

    // Get Auth Context
    const auth = useAuthContext();
    const enums = useEnumContext();

    console.log("================================== EditAnnotations ======================================");

    // Component States
    const [document, setDocument] = useState(null);
    const loadDocument = () => {
        DataService.GetDocument(id)
            .then(function (response) {
                setDocument(response.data);
            })
    }
    const [search, setSearch] = useState('');
    const [task, setTask] = useState('entity_mention');

    const [mentionAnnotation, setMentionAnnotation] = useState(null);
    const [mentions, setMentions] = useState(null);
    const [editMentions, setEditMentions] = useState(false);
    const [editCorefs, setEditCorefs] = useState(false);
    const loadMentions = () => {
        if (mentionAnnotation) {
            DataService.GetDocumentMentions(id, mentionAnnotation["id"])
                .then(function (response) {
                    setMentions(response.data);
                })
        }
    }

    // Setup Component
    useEffect(() => {
        loadDocument();
    }, []);
    useEffect(() => {
        loadMentions();
    }, [mentionAnnotation]);

    // Handlers
    const handleSetMentionAnnotation = (mention_annotation) => {
        setMentionAnnotation(mention_annotation);
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth={false} className={classes.container}>
                    <Toolbar className={classes.toolBar}>
                        <span className={classes.toolbartitle}>Document:&nbsp;&nbsp;</span>
                        {document && (
                            <span className={classes.toolbartext}>{document.document_name}</span>
                        )}
                        <TextField
                            className={classes.searchInput}
                            placeholder=""
                            type="text"
                            variant="outlined"
                            size="small"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon color="disabled" fontSize="small">search</Icon>
                                    </InputAdornment>
                                ),

                                endAdornment: search && (
                                    <IconButton
                                        aria-label="Clear search"
                                        onClick={() => setSearch("")}
                                    >
                                        <CancelRoundedIcon />
                                    </IconButton>
                                )
                            }}
                        />
                        <div className={classes.grow} />
                        <span className={classes.tasktitle}>Task:&nbsp;&nbsp;</span>
                        <FormControl variant="outlined" >
                            <Select
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            >
                                {enums["annotation_types"] && Object.keys(enums["annotation_types"]).map((key, index) =>
                                    <MenuItem value={key} key={index}>{enums["annotation_types"][key]}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <span>&nbsp;&nbsp;</span>
                        <IconButton aria-label="save" color="primary">
                            <Icon>save</Icon>
                        </IconButton>
                    </Toolbar>
                    <Grid container spacing={0}>
                        <Grid item sm={10}>
                            {document &&
                                <Annotations document={document} mentions={mentions} editMentions={editMentions} editCorefs={editCorefs}></Annotations>
                            }
                        </Grid>
                        <Grid item sm={2}>
                            {document &&
                                <AnnotationPanel document={document} handleSetMentionAnnotation={handleSetMentionAnnotation}></AnnotationPanel>
                            }
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(EditAnnotations);