

var Netmask = require('netmask').Netmask;



exports.process = function(data,callback) {
    
    var block = new Netmask(data.args[1]);
    
    var result = "subnet: " + block.base;
    result += ", mask: " + block.mask;
    result += ", broacast: " + block.broadcast;
    result += ", first: " + block.first;
    result += ", last: " + block.last;
 //   var result = {
  //      network: block.base,
    //    mask: block.mask,
     //   broadcast: block.broadcast,
     //   next: block.next()
    //};
    callback(false,result);

    
}

exports.processNext = function(data,callback) {
    var block = new Netmask(data.args[1]);
    
    var next = block.next();
    var result = "subnet: " + next.base;
    result += ", mask: " + next.mask;
    result += ", broacast: " + next.broadcast;
    result += ", first: " + next.first;
    result += ", last: " + next.last;
    
    callback(false,result);
}