const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "100vh"
    },
    grow: {
        flexGrow: 1,
    },
    main: {
        zIndex: theme.zIndex.drawer + 1,
    },
    card: {
        marginBottom: "25px",
    },
    exp: {
        marginBottom: "25px",
    },
    formControl: {
        margin: 10,
        minWidth: 120,
      },
});

export default styles;