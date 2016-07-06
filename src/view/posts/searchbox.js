var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports =  React.createClass({
  displayName: 'SearchBox',
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {searchStr: ''};
  },
  runSearch : function() {
    console.log('I don\'t actually do anything');
  },
  render : function() {
    var style = {paddingTop: '40px'};
    return (<div style={style}>
      <input type="text" valueLink={this.linkState('searchStr')}/>
      <input type="submit" value="Search" onClick={this.runSearch} />
    </div>);
  }
});