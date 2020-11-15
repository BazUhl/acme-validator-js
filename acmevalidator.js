const validate = (input, rules, callback, delta) => {
    try {
        if (!rules) { throw ("No rules defined") }

        if (Array.isArray(rules)) {
            var promises = [];
            rules.forEach(option => {
                promises.push(new Promise((resolve) => {
                    resolve(input == option);
                }))
            });
            Promise.all(promises).then(
                (arraymatch) => {
                    callback(null, arraymatch.some(val => { return val; }));
                }
            ).catch(function (err) {
                callback(err, null);
            })
        }
        else if (rules.constructor === Object) {
            var promises = [];
            Object.keys(rules).forEach(key => {
                promises.push(new Promise((resolve, reject) => {
                    if (!input[key] === undefined) {
                        resolve(false);
                    }

                    var negate = rules[key]['!'] == undefined ? false : true; // is it negation token
                    validateToken(input[key], (negate ? rules[key]['!'] : rules[key]), negate, resolve, reject);
                }))
            });

            Promise.all(promises).then((childmatch) => {
                callback(null, childmatch.every(val => { return val; }));
            }).catch(function (err) {
                callback(err, null);
            })
        }
        else {
            var match = rules == input
            || (rules == '$required' && input !== null)
            || (rules == '$requiredOrNull' && input !== undefined);

            callback(null, match);
        }

    } catch (exception) {
        callback(exception, null);
    }
}

// variable scoping
function validateToken(input, rule, negate, resolve, reject) {
    validate(input, rule, (err, childmatch) => {
        if (err) {
            reject(err);
        } else {
            resolve(negate ? !childmatch : childmatch);
        }
    });
}

module.exports = validate;

