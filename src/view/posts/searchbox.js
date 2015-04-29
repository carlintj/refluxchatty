var React = require("react/addons");
var ChattyActions = require("../../store/chattyactions.js");

module.exports =  React.createClass({
  mixins: [React.addons.LinkedStateMixin],
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