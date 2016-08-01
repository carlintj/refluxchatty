import _ from 'lodash';


let findChildPost = function(thread, postId) {
    let post = _.find(thread.children, {id: postId});

    if(post) {
        return post;
    }

    for(let i = 0; i < thread.children.length;i++) {
        let cpost = findChildPost(thread.children[i],postId);
        if(cpost) {
            return cpost;
        }
    }

    return undefined;
}

export default function(threads, postId) {
    return findChildPost({
        children: threads
    },postId);
}