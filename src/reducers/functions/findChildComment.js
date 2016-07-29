let findChildComment =  function (parentThread, childCommentId) {
    if (parentThread.id == childCommentId) return parentThread;
    for (var i = 0; i < parentThread.children.length; i++) {
        var child = parentThread.children[i];
        if (child.id == childCommentId) {
            return child;
        }
        var grandchild = findChildComment(child, childCommentId);
        if (grandchild) {
            return grandchild;
        }
    }
    return undefined;
}

export default findChildComment;