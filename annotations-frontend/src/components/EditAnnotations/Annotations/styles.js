const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        color: "#444",
        fontSize: "20px",
        fontFamily: "Lato, Trebuchet MS, Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "2.6em",
        background: "#fff",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        padding: 15,
        minHeight: "90vh",
        "& span": {
            padding: "10px 10px 10px 0px",
        },
        "& span span": {
            padding: "8px 8px 8px 0px",
        },
        "& span mark": {
            padding: "10px 10px 10px 0px",
        },
    },
    token: {
        cursor: "pointer",
        display: "inline-block",
        margin: "0 2px",
    },
    tokenselected: {
        textDecoration: "underline",
    },
    mention: {
        borderColor: "rgb(212, 212, 212)",
        /*backgroundColor: "rgba(0, 0, 0, 0)",*/
        border: "solid 2px #ddd",
        padding: "0px",
    },
});

export default styles;