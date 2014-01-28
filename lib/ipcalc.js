

var Netmask = require('netmask').Netmask;



exports.process = function(data,callback) {
    
    var block = new Netmask(data.args[1]);
    
    var result = "subnet: " + block.base;
    result += ", mask: " + block.mask;
    result += ", broadcast: " + block.broadcast;
    result += ", first: " + block.first;
    result += ", last: " + block.last;

    callback(false,result);

    
}

exports.processNext = function(data,callback) {
    var block = new Netmask(data.args[1]);
    
    var next = block.next();
    var result = "subnet: " + next.base;
    result += ", mask: " + next.mask;
    result += ", broadcast: " + next.broadcast;
    result += ", first: " + next.first;
    result += ", last: " + next.last;
    
    callback(false,result);
}