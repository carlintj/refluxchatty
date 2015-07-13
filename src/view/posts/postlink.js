var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var _ = require("lodash");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var styles = {
  img: {
    maxWidth:'600px'
  },
};

var chattyRegex = new RegExp(/shacknews.com\/chatty\?id=(\d+)(#item_)?(\d+)?/);
var imageHostRegex = new RegExp(/((imgur\.com)|(chattypics\.com))/);

var imgurEmbed = new RegExp(/(http|https):\/\/(www\.)?(imgur\.com\/)(\w+)/);
var imageEmbeds = {
  "chattypics.com": function(rawUrl) {
    return rawUrl;
  },
  "imgur.com": function(rawUrl) {
    var m = imgurEmbed.exec(rawUrl);
    var url = rawUrl;
    if(!!m && !!m[4]) {
      url = "//i.imgur.com/"+m[4]+".jpg";
    }
    return url;
  },
};


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
  onImageClick: function(e) {
    //handle if ctrlKey is not pressed and not using middle mouse button
    //so the browser can do the default event otherwise
    if(!e.ctrlKey && e.button !== 1) {
      e.preventDefault();
      this.setState({isExpanded: !this.state.isExpanded});
    }
  },
  render: function() {
    if(!this.state.isExpanded) {
      return <a href={this.props.url} onClick={this.onImageClick}>{this.props.url}</a>;
    }
    var domain = imageHostRegex.exec(this.props.url)[1];
    if(!!imageEmbeds[domain]) {
      return <div><img style={styles.img} src={imageEmbeds[domain](this.props.url)} onClick={this.onImageClick} /></div>;  
    }
    return <a href={this.props.url} onClick={this.onImageClick}>{this.props.url}</a>;
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