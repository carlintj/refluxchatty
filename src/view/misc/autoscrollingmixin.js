var isElementInViewport = require('../../util/elementscrolling.js').isElementInViewport;
var scrollIntoView = require('../../util/elementscrolling.js').scrollIntoView;
var React = require('react');
var ReactDOM = require('react-dom');


module.exports = class extends React.Component {
  state = {
    hasAnchored : false
  };

  componentDidMount() {
    if(!this.state.hasAnchored) {
      var anchor = this.props.parent.refs.anchor;
      if(anchor) {
        var element = ReactDOM.findDOMNode(anchor);
        if(element) {
          if(!isElementInViewport(element)) {
            scrollIntoView(element);
          }
        }
      }
      else {
        console.warn('unable to find anchor. parent: ', this.props.parent);
      }
      this.setState({hasAnchored : true});
    }
  }

  render() {
    return null;
  }
};