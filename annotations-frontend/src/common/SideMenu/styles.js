import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appLink:{
        color: "inherit",
        textDecoration: "inherit",
    },
    appTitle:{
        fontSize: "1.286rem",
        lineHeight: "1.33",
        fontWeight: "800",
        letterSpacing: "3px"
    },
    verticalDivider:{
        border: "1px solid white",
        marginLeft: "5px",
        marginRight: "5px",
    },
    list: {
        width: 250,
    },
    listItemText:{
        fontSize: "15px"
    },
});


export default styles;