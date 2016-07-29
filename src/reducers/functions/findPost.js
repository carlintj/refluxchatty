import _ from 'lodash';


let findChildPost = function(thread, postId) {
    _.each(thread.children, child => {
        if(child.id == postId) {
            return child;
        }

        if(thread.children.length > 0) {
            return _.find(thread.children, c => findChildPost(c, postId));
        }
    });
}

export default function(threads, postId) {
    let post = _.find(threads, {id: postId});
    if(post) {
        return post;
    }

    return _.find(threads, c => findChildPost(c, postId));
}