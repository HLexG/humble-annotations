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
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        // paddingBottom: theme.spacing(2),
        // paddingTop: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
    container: {
        backgroundColor: "#ffffff",
        paddingTop: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "20px",
        minHeight: "100vh"
    },
    toolbar: {
        background: "#ffffff",
        padding: 0,
        height: 40,
        border: "1px solid #ddd",
    },
    toolBar: {
        paddingLeft: "10px",
        paddingRight: "5px",
        fontWeight: 700,
        background: "#ffffff",
        height: 40,
        border: "1px solid #ddd",
    },
    toolbartitle: {
        fontSize: "12px",
        fontWeight: 600,
        color: "#444",
    },
    toolbartext: {
        fontSize: "16px",
        fontWeight: 300,
        color: "#444",
    },
    toolbaricon: {
        color: "#444",
    },
    toolbarbutton: {
        margin: "0px",
    },
    toolbarselect: {
        marginLeft: "5px",
    },
    pointer: {
        cursor: "pointer",
    },
    searchInput: {
        paddingLeft: "150px",
    },
    taskSelect: {
        width: "150px",
    }
});

export default styles;