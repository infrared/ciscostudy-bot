
exports.binary = function(data,callback) {
    var binary = data.args[0];
    var result = {
        dec: parseInt(binary,2),
        hex: parseInt(binary,2).toString(16)
    };
    callback(false,JSON.stringify(result));
};

exports.hex = function(data,callback) {
    var hex = data.args[0];
    var result = {
        dec: parseInt(hex,16),
        bin: parseInt(hex,16).toString(2)
    };
    callback(false,JSON.stringify(result));
};
exports.bwAnd = function(data,callback) {
    var result = data.args[1] & data.args[2];
    callback(false,result);
};
