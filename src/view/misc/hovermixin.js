import ReactDOM from 'react-dom';

module.exports = {
  componentWillMount: function() {
    this.state = this.state || {};
    this.state.hovered = false;
  },
  componentDidMount: function() {
    var hover = this.refs.hover;
    if(hover) {
      var dom = ReactDOM.findDOMNode(hover);
      dom.addEventListener('mouseover', this.onOver);//.bind(this));
      dom.addEventListener('mouseout', this.onOut);//.bind(this));  
    } else {
      console.warn('unable to find hover ref');
    }
  },
  componentWillUnmount: function() {
        var hover = this.refs.hover;
    if(hover) {
      var dom = ReactDOM.findDOMNode(hover);
      dom.removeEventListener('mouseover', this.onOver);
      dom.removeEventListener('mouseout', this.onOut);
    } else {
      console.warn('unable to find hover ref');
    }
  },
  onOver: function() {
    this.setState({
      hovered: true
    });
  },
  onOut: function() {
    this.setState({
      hovered: false
    });
  },
};