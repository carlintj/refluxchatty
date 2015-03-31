var isElementInViewport = require("../../util/elementscrolling.js").isElementInViewport;
var scrollIntoView = require("../../util/elementscrolling.js").scrollIntoView;
var React = require("react/addons");

var autoscrolling = React.createClass({
    componentDidMount: function() {
      if(!this.state.hasAnchored) {
        var anchor = this.props.parent.refs.anchor;
        if(anchor) {
          var element = React.findDOMNode(anchor);
          if(element) {
            if(!isElementInViewport(element)) {
              scrollIntoView(element);
            }
          }
        }
        else {
          console.warn("unable to find anchor. parent: ", this.props.parent);
        }
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