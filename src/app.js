var React = require("react/addons");
var XDate = require("xdate");
var Chatty = require("./view/chatty.js");
var styles = require("./view/styles.js")
React.render(<Chatty style={styles.body} />, document.body);