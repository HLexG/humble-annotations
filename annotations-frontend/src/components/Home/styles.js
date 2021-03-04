
const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "100vh"
    },
    grow: {
        flexGrow: 1,
    },
    main: {
        backgroundColor: "#efedf5",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingTop: 15,
        zIndex: theme.zIndex.drawer + 1,
        minHeight: "100vh"
    },
    card: {
        marginBottom: "25px",
    }
});

export default styles;