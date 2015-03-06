var isElementInViewport = require("../util/elementscrolling.js").isElementInViewport;
var scrollIntoView = require("../util/elementscrolling.js").scrollIntoView;
var React = require("react");

var autoscrolling = React.createClass({
    componentDidMount: function() {
      console.log("componentDidUpdate");
      if(!this.state.hasAnchored) {
        if(!isElementInViewport(this.props.parent.getDOMNode())) {
          console.log("scrolling");
          scrollIntoView(this.props.parent.getDOMNode());
        }
        console.log("setting hasAnchored");
        this.setState({hasAnchored : true});
      }
    },
    getInitialState: function() {
      return ({
        hasAnchored : false
      });
    },
    render: function() {
      return <span/>;
    }
});

module.exports = autoscrolling;