var React = require("react");
var ChattyActions = require("../../store/chattyactions.js");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

module.exports =  React.createClass({
  displayName: 'SearchBox',
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {searchStr: ''};
  },
  runSearch : function() {
    ChattyActions.runSearch(this.state.searchStr);
  },
  render : function() {
    var style = {paddingTop: '40px'};
    return (<div style={style}>
      <input type="text" valueLink={this.linkState('searchStr')}/>
      <input type="submit" value="Search" onClick={this.runSearch} />
    </div>);
  }
});