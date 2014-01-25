var request = require('request');

var quiz = { };



exports.distinctCerts = function(data,callback) {

    request.get('http://quiz.pickie.org/distinct-certs', function(err,res,body) {
        if (err) {
            callback(err,false);
        } else {
            var result = JSON.parse(body);
            if (result.success) {
                callback(false,result.success);
            } else {
                callback(false,"error");
            }
        }
    });
};

exports.countCert = function(data,callback) {
    request.get('http://quiz.pickie.org/count/' + data.args[1],function(err,res,body){
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
exports.countCertType = function(data,callback) {
    request.get('http://quiz.pickie.org/count/' + data.args[1] + '/' + data.args[2], function(err,res,body){
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
exports.certTopics = function(data,callback) {
    request.get('http://quiz.pickie.org/' + data.args[1] + '/distinct-topics',function(err,res,body) {
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

exports.quizRandom = function(data,callback) {
    request.get('http://quiz.pickie.org/' + data.args[1] + '/random',function(err,res,body) {
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
    if (quiz[data.to] !== undefined) {
        var current = quiz[data.to];
        
        var correct;
        if (current.type === "ios") {
            if (data.args[1] === current.answer) {
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
            
        if (correct) {
            delete quiz[data.to];
            var response = correctResponse[ Math.floor(Math.random()*correctResponse.length) ];
            callback(false,response);
        } else {
            var response = wrongResponse[ Math.floor(Math.random()*wrongResponse.length) ];
            callback(false,response);  
        }    
    }    
}
