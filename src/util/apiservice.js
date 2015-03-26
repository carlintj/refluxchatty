var _ = require("lodash");

var getPost = function(post) {
    var fixedpost = {
        id: post.id,
        author: post.author,
        body: post.body,
        date : new Date(post.date),
        replyCount: 0,
        children: [],
        parentId : post.parentId
    };
    fixedpost.dateStr = fixedpost.date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    return fixedpost;
};

var processThread = function (thread) {
    var processPost = function (post) {
        _.remove(posts, post);
        var fixedpost = getPost(post);
        var children = _.filter(posts, {
            parentId: fixedpost.id
        });
        if (children && children.length > 0) {
            _.each(children,function(child) {
                fixedpost.children.push(processPost(child));
            });
        }
        latestReply = Math.max(latestReply,fixedpost.date);
        return fixedpost;
    };
    
    var latestReply = 0;
    var posts = thread.posts.reverse();
    var replyCount = thread.posts.length-1;
    var post = processPost(_.find(posts, {
        parentId: 0
    }));
    post.replyCount = replyCount;
    post.latestReply = new Date(latestReply).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});;
    
    post.focused = false;
    post.expandedChildId = 0;
    return post;
};

module.exports = {processThread : processThread, getPost : getPost};