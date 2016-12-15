import React from 'react';
import ReplyBox from './replybox';
import ReplyButton from './replybutton';
import { fixComment, getVisibleLength } from '../../util/commenttruncation';

let styles = {
    parentbar: {
        background: '#FFFFFF',
        borderBottom: '2px solid #000000',
        paddingLeft: '20px',
        padding: 2,
        position: 'fixed',
        fontSize: '0.8em',
        width: 'calc(100% - 42px)',
        overflow: 'hidden',
        height: '16pt',
        top: '80px',
        zIndex: '100'
    },
    username: {
        color: '#3F82C5'
    },
}

export default class ParentCommentBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {author, body, latestReply, category} = this.props;
        let shortBody = body.replace(/<br \/>/g, ' ');
        if (getVisibleLength(shortBody) > 180) {
            shortBody = shortBody.substring(0, 180);
            shortBody = fixComment(shortBody + '...');
        }
        return (
            <div style={styles.parentbar}>
                <span style={styles.username}>{author}</span>
                <span dangerouslySetInnerHTML={{__html: shortBody}} ></span>
                <ReplyButton />
            </div>
        );
    }
}

ParentCommentBar.propTypes = {
    author: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    latestReply: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
}
