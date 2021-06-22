const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    toolspanel: {
        background: "#fff",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        minHeight: "90vh",
        paddingTop: "5px",
        paddingLeft: "10px",
    },
    toolstitle: {
        padding: 5,
        fontSize: "12px",
        fontWeight: 600,
        color: "#444",
    },
    annotationReferences: {
        paddingTop: "0px",
        paddingBottom: "0px",
    },
    annotationReferenceItems: {
        paddingLeft: "5px",
        paddingRight: "5px",
    }
});

export default styles;