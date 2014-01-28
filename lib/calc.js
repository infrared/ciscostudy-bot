var mathjs = require('mathjs');

var math = mathjs();


var calc = function(data,callback) {

    var result = math.eval(data.args[1]);
    callback(false,result);
}

exports.calc = calc;
