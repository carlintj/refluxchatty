var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var _ = require("lodash");


module.exports = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    },
    render: function() {
      return <a href={this.props.url} target="_blank">{this.props.text}</a>;
    }
    
});