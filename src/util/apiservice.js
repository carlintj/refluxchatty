var _ = require("lodash");

var getPost = function(post) {
    var fixedpost = {
        id: post.id,
        author: post.author,
        body: post.body,
        date : post.date,
        replyCount: 0,
        children: []
    }
    return fixedpost;
}

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
        return fixedpost;
    }
    
    var posts = thread.posts.reverse();
    var replyCount = thread.posts.length-1;
    var post = processPost(_.find(posts, {
        parentId: 0
    }));
    post.replyCount = replyCount;
    
    //these should be moved to the action, domain specific
    post.focused = false;
    post.expandedChildId = 0;
    return post;
};

module.exports = {processThread : processThread, getPost : getPost};