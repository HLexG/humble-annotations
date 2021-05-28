import { pink, red } from "@material-ui/core/colors";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    main: {
       
    },
    avatar: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
    },
    avatarText: {
       paddingLeft: "10px",
       paddingTop: "5px",
    },
});

export default styles;