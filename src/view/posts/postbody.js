var _ = require("lodash");
var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var PostLink = require("./postlink.js");


var findTags = function(body, tags) {
   var startIndex = 0, searchStrLen = body.length;
   var index, indices = [];
   _.forEach(tags,(tag) => {
     var start = "<" + tag;
     var end = "</" + tag +">";
     while ((index = body.indexOf(start, startIndex)) > -1) {
       var endIndex = body.indexOf(end,startIndex) + end.length;
        indices.push({
          tag: tag,
          start: index,
          end: endIndex,
          content: ''
        });
        startIndex = endIndex;
    }
   });
  return indices;
};

var urlregex = new RegExp(/<a\s+[^>]*href="([^"]*)"[^>]*>(.*)<\/a>/i);


module.exports = React.createClass({
  render: function() {
    var props = this.props;
    
    var comment = [];
    var tags = findTags(props.body,['a']);
    
    //if no tags just write out the comment
    if(tags.length == 0) {
      comment.push(<span key={0} dangerouslySetInnerHTML={{__html: props.body }} />);  
    } else {
      var start = 0;
      _.forEach(tags,(tag) => {
        if(start != tag.start) { 
          //need to grab plain text bewteen the last tag if any and this one
          comment.push(<span key={comment.length} dangerouslySetInnerHTML={{__html: props.body.substring(start,tag.start) }} />);  
        }
        if(tag.tag == 'a') {
          var str = props.body.substring(tag.start,tag.end);
          var m = urlregex.exec(str);
          var url = m[1];
          var text = m[2];
          comment.push(<PostLink key={comment.length} url={url} text={text} />);
        }
        start = tag.end;
      });
      //if anything is left over write it out
      if(start != props.body.length-1) {
        comment.push(<span key={comment.length} dangerouslySetInnerHTML={{__html: props.body.substring(start) }} />);  
      }
    }
    return <div>{comment}</div>;
  }
});