const styles = theme => ({
    toolspanel: {
        background: "#fff",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        minHeight: "90vh",
        paddingTop: 5,
    },
    toolstitle:{
        padding: 5,
        fontSize: "12px",
        fontWeight: 600,
        color: "#444",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: "solid 2px #ddd",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
      },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#808080",
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 24,
        width: '100%',
    },
});

export default styles;