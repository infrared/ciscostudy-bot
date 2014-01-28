var irc = require('irc');

var config = require('./config.json');

var modules = { };
modules.conversion = require('./lib/conversion.js');
modules.ciscostudy = require('./lib/ciscostudy.js');
modules.ipcalc     = require('./lib/ipcalc.js');
modules.calc       = require('./lib/calc.js');

var client = new irc.Client('irc.freenode.net',
    config.nick,
    {
        channels: config.channels
    }
);


client.addListener('message',function(from,to,message) {
    console.log({ "from": from, "to": to});
    for (var i=0;i<config.dispatch.length;i++) {
        var re = new RegExp(config.dispatch[i].match);
        if (re.test(message)) {
            console.log("matched: ",re);
            if (config.dispatch[i].say !== undefined) {
                client.say(to, config.dispatch[i].say);
            } else if ( config.dispatch[i].module !== undefined) {
                var module = config.dispatch[i].module;
                var func   = config.dispatch[i].func;
                var args = message.match(re);
                var data = {
                    from: from,
                    to : to,
                    message: message,
                    args: args
                };
                try {
                    modules[module][func](data,function(err,res) { 
                        client.say(to,res);
                    });
                } catch(err) {
                    client.say(to,err);
                }
                break; 
            }
        }
    }
});
client.addListener('error',function(message) {
    console.log('error: ',message);
});
