const colorList = ["#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#000000","#948A54"]
const styles = theme => ({
    content: {
        color: "#444",
        fontSize: "20px",
        fontFamily: "Lato, Trebuchet MS, Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "2.4em",
        background: "#fff",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        padding: 15,
        minHeight: "90vh",
        "& span":{
            padding: "10px 10px 10px 0px",
        },
        "& span span":{
            padding: "8px 8px 8px 0px",
        },
        "& span mark":{
            padding: "10px 10px 10px 0px",
        },
    },
    token:{
        cursor: "pointer",
        display: "inline-block",
        margin: "0 2px",
    },
    tokenselected:{
        textDecoration: "underline",
    },
    mentionhead:{
        borderColor: "rgb(212, 212, 212)",
        backgroundColor: colorList[Math.floor(Math.random() * 8) + 1 ],
        padding: "12px 12px 12px 0px",
        cursor: "pointer",
    },
    mentionheadtext:{
        fontSize: "15px",
        verticalAlign: "top",
        paddingLeft: "2px",
    },
    mention:{
        borderColor: "rgb(212, 212, 212)",
        /*backgroundColor: "rgba(0, 0, 0, 0)",*/
        border: "solid 2px #ddd",
        padding: "0px",
    },
});

export default styles;