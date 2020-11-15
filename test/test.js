var assert = require('assert');
const validate = require('../acmevalidator');

describe('#basictest', function () {
    it('simple property match', function (done) {
        validate({
            "property": "value"
        }, {
            "property": "value"
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('simple property match', function (done) {
        validate({
            "property": "value",
            "property2": "value"
        }, {
            "property": "value"
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('simple property mismatch', function (done) {
        validate({
            "property": "value"
        }, {
            "property": "differentvalue"
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });

    it('simple property mismatch', function (done) {
        validate({
            "property": "value",
            "property2": "value"
        }, {
            "property": "differentvalue"
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });

    it('subproperty match', function (done) {
        validate({
            "property": {
                "subproperty": "value"
            },
            "property2": "value"
        }, {
            "property": {
                "subproperty": "value"
            }
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('subproperty match', function (done) {
        validate({
            "property": {
                "subproperty": "value"
            },
            "property2": "value"
        }, {
            "property": {
                "subproperty": "differentvalue"
            }
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });
});

describe('#negation', function () {
    it('should return false', function (done) {
        validate({
            "property": "value",
        }, {
            "property": { "!": "value" }
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": "value",
        }, {
            "property": { "!": "differentvalue" }
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": 10,
        }, {
            "property": { "!": 20 }
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": 10,
        }, {
            "property": { "!": 10 }
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });
});

describe('#required or requiredOrNull', function () {
    it('should return true', function (done) {
        validate({
            "property": "value"
        }, {
            "property": "$required"
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": "value"
        }, {
            "property": "$requiredOrNull"
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": null
        }, {
            "property": "$requiredOrNull"
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });
});

describe('#array', function () {
    it('should return true', function (done) {
        validate({
            "property": "value"
        }, {
            "property": ["value"]
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": "value"
        }, {
            "property": ["value", "value2"]
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return false', function (done) {
        validate({
            "property": "value1"
        }, {
            "property": ["value", "value2"]
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": 10
        }, {
            "property": [5, 10]
        }, (error, match) => {
            assert.strictEqual(match, true);
            done();
        })
    });

    it('should return true', function (done) {
        validate({
            "property": 10
        }, {
            "property": [5, 15]
        }, (error, match) => {
            assert.strictEqual(match, false);
            done();
        })
    });
});