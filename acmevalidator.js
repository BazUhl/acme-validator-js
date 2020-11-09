const Validate = (input, rules, callback) => {    
    try {
        if (!rules) { throw ("No rules defined") }
        var _rules = JSON.parse(JSON.stringify(rules));

        if (Array.isArray(_rules)) {
            var arraymatch = false;
            var promises = new Array;
            _rules.forEach(option => {
                promises.push(new Promise(function (resolve) {
                    resolve(input == option);
                }))
            });
            Promise.all(promises).then(
                function (arraymatch) {
                    callback(null, arraymatch.some(val => { return val }));
                }
            ).catch(function (err) {
                    callback(err, null);
                })
        }
        else if (_rules.constructor === Object) {
            var promises = new Array();
            Object.keys(_rules).forEach(key => {
                promises.push(new Promise(function (resolve, reject) {
                    if (!input[key]){resolve(false)}
                    Validate(input[key], rules[key], (err, childmatch) => {
                        if (err) {
                            reject(err);
                        }
                        else { resolve(childmatch) }
                    })
                }))
            });
            Promise.all(promises).then(function (childmatch) {
                callback(null, childmatch.every(val => { return val }));
            }).catch(function (err) {
                callback(err, null);
            })
        }
        else {
            callback(null, input == rules);
        }


    } catch (exception) {
        callback(exception, null);
    }
}
module.exports = Validate;

