var React = require('react');
var ReactDOM = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var styles = {
  commentBox: {
    width: 500,
    height: 130
  },
};

let ReplyBox = React.createClass({
  mixins: [LinkedStateMixin],
  propTypes: { 
    parentCommentId: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    var textNode = ReactDOM.findDOMNode(this.refs.commentBox);
    textNode.focus();
  },
  getInitialState: function() {
    return {body: ''};
  },
  render: function(){
    //JSX can't escape {
    var red = 'r{ ... }r';
    var green = 'g{ ... }g';
    var blue = 'b{ ... }b';
    var yellow = 'y{ ... }y';
    var olive = 'e[ ... ]e';
    var lime = 'l[ ... ]l';
    var orange = 'n[ ... ]n';
    var pink = 'p[ ... ]p';
    
    var italics = '/[ ... ]/';
    var bold = 'b[ ... ]b';
    var quote = 'q[ ... ]q';
    var sample = 's[ ... ]s';
    var underline = '_[ ... ]_';
    var strike = '-[ ... ]-';
    var spoiler = 'o[ ... ]o';
    var code = '/{{ ... }}/';
    
    var container = {display: 'flex'};
    var fixed = {width: '530px'};
    var flexed = {flexGrow: 1, display:'flex'};
    
    var subdiv = {padding: '5px'};

    return <div>
    <div style={container}>
      <div style={fixed}>
        <textarea ref="commentBox" valueLink={this.linkState('body')} 
          style={styles.commentBox} onClick={this.onTextClick}></textarea>
      </div>
      <div style={flexed}>
        <div style={subdiv}>
          <p><span className="jt_red">red</span>&nbsp;<span>{red}</span></p>
          <p><span className="jt_green">green</span>&nbsp;<span>{green}</span></p>
          <p><span className="jt_blue">blue</span>&nbsp;<span>{blue}</span></p>
          <p><span className="jt_yellow">yellow</span>&nbsp;<span>{yellow}</span></p>
        </div>
        <div style={subdiv}>
          <p><span className="jt_olive">olive</span>&nbsp;<span>{olive}</span></p>
          <p><span className="jt_lime">lime</span>&nbsp;<span>{lime}</span></p>
          <p><span className="jt_orange">orange</span>&nbsp;<span>{orange}</span></p>
          <p><span className="jt_pink">pink</span>&nbsp;<span>{pink}</span></p>
        </div>
        <div style={subdiv}>
          <p><span className="jt_italics">italics</span>&nbsp;<span>{italics}</span></p>
          <p><span className="jt_bold">bold</span>&nbsp;<span>{bold}</span></p>
          <p><span className="jt_quote">quote</span>&nbsp;<span>{quote}</span></p>
          <p><span className="jt_sample">sample</span>&nbsp;<span>{sample}</span></p></div>
        <div style={subdiv}>
          <p><span className="jt_underline">underline</span>&nbsp;<span>{underline}</span></p>
          <p><span className="jt_strike">strike</span>&nbsp;<span>{strike}</span></p>
          <p><span>spoiler</span>&nbsp;<span>{spoiler}</span></p>
          <p><span>code</span>&nbsp;<span>{code}</span></p>
        </div>
      </div>
    </div>
    <div><input type="submit" value="Submit" onClick={this.onSubmitComment} /></div>
    </div>;
  },
  onSubmitComment: function(event) {
    event.stopPropagation();
    let {parentCommentId, username, password} = this.props;
    this.props.chattyActions.submitComment(parentCommentId, this.state.body, username, password);
  },
  //this seems like a dumb hack
  onTextClick: function(event) {
    event.stopPropagation();
  }
});

module.exports = ReplyBox;