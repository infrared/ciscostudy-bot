var request = require('request');
var optional = require('text-optional');
var quiz = { };

var WSURL = 'http://ws.ciscostudy.org';

exports.distinctCerts = function(data,callback) {

    request.get(WSURL + '/certs', function(err,res,body) {
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.success) {
                    callback(false,result.success);
                } else {
                    callback(false,"error");
                }
            } else {
                callback(false,res.statusCode);
            }
        }
    });
};

exports.countCert = function(data,callback) {
    request.get(WSURL + '/count/' + data.args[1],function(err,res,body){
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.success.toString()) {
                    callback(false,result.success.toString());
                } else {
                    callback(false,"error");
                }
            } else {
                callback(false,res.statusCode);
            }
        }
    });
}
exports.countCertType = function(data,callback) {
    request.get(WSURL + '/count/' + data.args[1] + '/type/' + data.args[2], function(err,res,body){
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.success.toString()) {
                    callback(false,result.success.toString());
                } else {
                    callback(false,"error");
                }
            
            } else {
                callback(false,res.statusCode);
            }
        }
    });
}
exports.certTopics = function(data,callback) {
    request.get(WSURL + '/topics/' + data.args[1],function(err,res,body) {
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.success) {
                    callback(false,result.success);
                } else {
                    callback(false,"error");
                }
            } else {
                callback(false,res.statusCode);
            }
        }
    });
}
exports.quizTopic = function(data,callback) {
    request.get(WSURL + '/quiz/' + data.args[1] + '/topic/' + data.args[2], function(err,res,body) {
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                
                var result = JSON.parse(body);
                if (result.success) {
                    quiz[data.to] = result.success;
                    var ask;
                    if (result.success.type === "ios") {
                        ask = result.success.question;
                    }
                    if (result.success.type === "definition") {
                        ask = result.success.definition;
                    }
                    if (result.success.type === "basic") {
                        ask = result.success.question;
                    }
                    callback(false,ask);
                } else if (result.success === null) {
                    callback(false,"unknown option: " + data.args[1]);
                } else {
                    callback(false,'error');
                }
            } else {
                callback(false,res.statusCode);
            }
        }
    });
}
exports.quizRandom = function(data,callback) {
    request.get(WSURL + '/quiz/' + data.args[1] + '/random',function(err,res,body) {
        if (err) {
            callback(err,false);
        } else {
            if (res.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.success) {
                    quiz[data.to] = result.success;
                    var ask;
                    if (result.success.type === "ios") {
                        ask = result.success.question;
                    }
                    if (result.success.type === "definition") {
                        ask = result.success.definition;
                    }
                    if (result.success.type === "basic") {
                        ask = result.success.question;
                    }
                    callback(false,ask);
                } else if (result.success === null) {
                    callback(false,"unknown option: " + data.args[1]);
                } else {
                    callback(false,'error');
                }
            } else {
                callback(false,res.statusCode);
            }
        }
    });
}
exports.giveUp = function(data,callback) {
    if (quiz[data.to] !== undefined) {
        var current = quiz[data.to];
        delete quiz[data.to];
        if (current.type === "ios") {
            callback(false,current.answer);
        } else if (current.type === "basic") {
            callback(false,current.answer);
        } else if (current.type === "definition") {
            callback(false,current.term);
        } else {
            callback(false,"unknown type");
        }
    }
}
exports.quizAnswer = function(data,callback) {
    var correctResponse = [
        "good job",
        "awesome",
        "nice bro",
        "yup",
        "correct",
        "yes",
        "you rock",
        "amazing"
    ];
    var wrongResponse = [
        "nope",
        "sorry",
        "try again",
        "no",
    ];
    var almostResponse = [
        "almost bro",
        "close",
        "ooo so warm"
    ];
    if (quiz[data.to] !== undefined) {
        var current = quiz[data.to];
        
        var correct;
        var almost;
        
        if (current.type === "ios") {
            if (optional(data.args[1],current.answer) ) {
                correct = true;

            }
        }
        if (current.type === "basic") {
            var answer = current.answer;
            var guess = data.args[1];
            var split = answer.match(/(\S+)/g);
            var test = 0;
            for (var i=0;i<split.length;i++) {
                var re = new RegExp(split[i],"i");
                if (re.test(guess)) {
                    test++;
                }
            }
            if (split.length/test > 1) {
                almost = true;

            } else if (split.length === test) {
                correct = true;
            }

        }
        if (current.type === "definition") {
            var reTerm = new RegExp("^" + current.term + "$","i");
            if (current.acronym.length) {
                var reAcro = new RegExp("^" + current.acronym + "$","i");
                if (  (reTerm.test(data.args[1])) || ( reAcro.test(data.args[1])) ) {
                    correct = true;
                }
            } else {
                if ( reTerm.test(data.args[1]) ) {
                    correct = true;
                }
            }
        }
        if (almost) {
            var response = almostResponse[ Math.floor(Math.random()*almostResponse.length) ];
            callback(false,response);
        }
        else if (correct) {
            delete quiz[data.to];
            var response = correctResponse[ Math.floor(Math.random()*correctResponse.length) ];
            callback(false,response);
        } else {
            var response = wrongResponse[ Math.floor(Math.random()*wrongResponse.length) ];
            callback(false,response);  
        }    
    }    
}
