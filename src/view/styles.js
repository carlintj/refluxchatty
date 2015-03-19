var styles = {
  body : {
    	fontFamily: 'Helvetica,Arial,sans-serif', 
    	fontSize: 13, 
    	background : '#5c97bf'
  },
  commentContainer : {
    marginLeft: 12,
    border: '1px solid #cdced0',
    padding: '2px'
  },
  highlightedComment : {
    background: '#E0F3FF'
  },
  highlightedParent : { 
    background: '#E0F3FF', //A7CDF0
  },
  parentContainer : {
    background: '#FFFFFF',
    margin: '8px',
    //padding: '2px'
  },
  parentComment: {
    border: '2px solid #000000',
    padding: '2px',
  },
  userName : {
    color: '#3F82C5'
  },
  date : {
    fontSize : 10
  },
  clickable: { 
    cursor:'pointer',
    color: '#004FFF'
  },
  statusbar: {
    background: '#FFFFFF',
    border: '2px solid #000000',
    margin: 0,
    padding: 0
  },
  success: {
    color: '#3F82C5'
  },
  error: {
    color: '#red !important'
  },
  commentBox: {
    width: 600,
    height: 150
  }
  
};

module.exports = styles;