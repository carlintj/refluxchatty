import _ from 'lodash';

var combine = function() {
  var res = {};
  for(var i = 0; i < arguments.length; ++i) {
    if(arguments[i]){
      _.extend(res,arguments[i]);
    }
  }
  return res;
};


module.exports = combine;