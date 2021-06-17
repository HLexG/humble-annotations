import React, {useRef, useState} from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import styles from './styles';

// https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

// const FileUploader = (props) => {
const FileUploader = ( props ) => {

    const {classes, onFileSelectError, onFileSelectSuccess} = props;
    const fileInput = useRef(null);
    const [uploadButtonTitle, setUploadButtonTitle] = useState("Upload Zip File");
    const [uploadButtonOn, setUploadButtonOn] = useState(true);

    

    const handleFileInput = (e) => {
      // handle validations
      const file = e.target.files[0];
      // https://www.bytesomrekenen.nl/
      if (file.size > 200000){
        onFileSelectError({ error: "File size cannot exceed more than 200MB" });
      }
      else {
        console.log("safe")
        setUploadButtonOn(false);
        setUploadButtonTitle(`File '${file.name}' uploaded`);
        onFileSelectSuccess(file);
      }
    };

    return (

      <Button
        fullWidth
        variant="contained"
        component="label"
        color="primary"
        required={true}
        className={classes.uploadButton}
        onClick={e => fileInput.current && fileInput.current.click()}
        disabled={!uploadButtonOn} 
      >
        {uploadButtonTitle}
        <input
          type="file"
          accept=".zip"
          onChange={handleFileInput}
          hidden
        />
      </Button>
    );
};

export default withStyles( styles )( FileUploader );


