var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var _ = require("lodash");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

//http://www.shacknews.com/chatty?id=33586767
//http://www.shacknews.com/chatty?id=33588017#item_33588017
//shacknews.com\/chatty\?id=(\d+)(#item_)?(\d+)?

var chattyRegex = new RegExp(/shacknews.com\/chatty\?id=(\d+)(#item_)?(\d+)?/);

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

module.exports = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    },
    render: function() {
      var m = chattyRegex.exec(this.props.url);
      if(!!m) {
        console.log(this.props.url,"is chatty link");
        return  <ChattyLink url={this.props.url} />;
      }
      return <a href={this.props.url} target="_blank">{this.props.text}</a>;
    }
    
});