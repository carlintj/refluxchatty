var React = require('react');
var CommentList = require('./posts/commentlist.js');
var keymaster = require('keymaster');

let Chatty = React.createClass({
    componentDidMount: function () {
        let {chattyActions} = this.props;
        keymaster('j', function () {
            chattyActions.selectNextParent();
        });
        keymaster('k', function () {
            chattyActions.selectPrevParent();
        });
        keymaster('x', function () {
            chattyActions.toggleParentComment();
        });
        keymaster('r', function (event) {
            event.preventDefault();
            chattyActions.openReply();
        });
        keymaster('home', function () {
            chattyActions.selectFirstParent();
        });
        keymaster('end', function () {
            chattyActions.selectLastParent();
        });
        keymaster('h', function () {
            chattyActions.hideSelectedThread();
        });
        keymaster('a', function () {
            chattyActions.selectPrevComment();
        });
        keymaster('z', function () {
            chattyActions.selectNextComment();
        });
        // keymaster('f', () => {
        //   this.setState({showSearch: !this.state.showSearch});
        // });
    },
    componentWillUnmount: function () {
        keymaster.unbind('j');
        keymaster.unbind('k');
        keymaster.unbind('x');
        keymaster.unbind('r');
        keymaster.unbind('home');
        keymaster.unbind('end');
        keymaster.unbind('h');
        //keymaster.unbind('f');
    },
    render: function () {
        return (<CommentList {...this.props} />);
    }
});

export default Chatty;