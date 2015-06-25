var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var _ = require("lodash");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var chattyRegex = new RegExp(/shacknews.com\/chatty\?id=(\d+)(#item_)?(\d+)?/);
var imageHostRegex = new RegExp(/(imgur\.com)/);

var ChattyLink = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    var m = chattyRegex.exec(this.props.url);
    var threadId = m[1];
    var postId = m[3];
    return <Link to="SinglePost" query={{threadId: threadId, postId: postId}}>{this.props.url}</Link>;
  }
});

var ImageLink = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {isExpanded: false};
  },
  onImageClick: function() {
    this.setState({isExpanded: !this.state.isExpanded});
    return false;
  },
  render: function() {
    if(!this.state.isExpanded) {
      return <a href={this.props.url} onClick={this.onImageClick}>{this.props.url}</a>;
    }
    return <div><img src={this.props.url} onClick={this.onImageClick} /></div>;
  }
});

module.exports = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    },
    render: function() {
      var m = chattyRegex.exec(this.props.url);
      if(!!m) {
        return  <ChattyLink url={this.props.url} />;
      }
      m = imageHostRegex.exec(this.props.url);
      if(!!m) {
        return <ImageLink url={this.props.url} />;
      }
      return <a href={this.props.url} target="_blank">{this.props.text}</a>;
    }
});