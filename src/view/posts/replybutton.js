var React = require('react');
var combine = require('../../util/styleutil.js');
var HoverMixin = require('..//misc/hovermixin.js');

var styles = {
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
  
  button: {
    //padding: '5px',
    //borderRadius: '2px',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
    //boxSizing: 'border-box',
    display: 'inline-block',
    float: 'right'
  },
  
  buttonHover: {
    background: '#D9D9D9',
  },
};

let ReplyButton = React.createClass({
  mixins: [HoverMixin],
    render: function(){
      var style = combine(
        styles.button,
        styles.clickable);
        if(this.state.hovered) style=combine(style,styles.buttonHover);
        
        return (<div ref="hover" style={style}>
          <a onClick={this.onClickHandler}>
            Reply</a>
        </div>);
    },
    onClickHandler : function() {
      this.props.chattyActions.openReply(this.props.threadId,this.props.commentId);
    }
});

module.exports = ReplyButton