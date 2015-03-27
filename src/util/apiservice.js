var _ = require("lodash");

var getTimeString = function(date) {
  var hour = date.getHours();
  var minute = date.getMinutes();
  var ap = "AM";
  if (hour > 11) {
    ap = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  var timeString = hour + ':' + minute + ' '  + ap;
  return timeString;
}

var getPost = function(post) {
  var fixedpost = {
    id: post.id,
    author: post.author,
    body: post.body,
    date: new Date(post.date),
    replyCount: 0,
    children: [],
    parentId: post.parentId
  };
  fixedpost.dateStr = getTimeString(fixedpost.date);
  return fixedpost;
};

var processThread = function(thread) {
  var processPost = function(post) {
    _.remove(posts, post);
    var fixedpost = getPost(post);
    var children = _.filter(posts, {
      parentId: fixedpost.id
    });
    if (children && children.length > 0) {
      _.each(children, function(child) {
        fixedpost.children.push(processPost(child));
      });
    }
    latestReply = Math.max(latestReply, fixedpost.date);
    return fixedpost;
  };

  var latestReply = 0;
  var posts = thread.posts.reverse();
  var replyCount = thread.posts.length - 1;
  var post = processPost(_.find(posts, {
    parentId: 0
  }));
  if(latestReply == 0) {
    latestReply = post.date;
  }
  post.replyCount = replyCount;
  post.latestReply = new Date(latestReply);
  post.latestReplyStr = getTimeString(post.latestReply);

  post.focused = false;
  post.expandedChildId = 0;
  return post;
};

module.exports = {
  processThread: processThread,
  getPost: getPost
};