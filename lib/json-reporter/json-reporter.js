jasmine.JSONReporter = function(_doc) {

    var self = this;
    var doc = _doc || window.document;
    var startingTime = (new Date()).getTime();

    self.exports = {
        elapsedTime: null,
        specsCount: 0,
        specsPassed: 0,
        suites: []
    },

    self.reportRunnerResults = function() {
        this.exports.elapsedTime = parseInt((new Date()).getTime() - startingTime, 10) + "ms" ;

        console.log( JSON.stringify(this.exports) );

        if ( this.exports.specsCount - this.exports.specsPassed !== 0 ) {
            self.log('Exiting with errors');
        } else {
            self.log('Exiting with ' + this.exports.specsCount + ' passed specs ');
        }

    },

    self.reportSpecResults = function( spec ) {

        this.exports.specsCount += 1;

        if (spec.results().passed()) {
            this.exports.specsPassed++;
        }

        this.exports.suites.push({
            suite: spec.suite.parentSuite ? spec.suite.parentSuite.description : spec.suite.description,
            spec: spec.description,
            passed: spec.results().passed()
        });
    }

    self.log = function() {
        var console = jasmine.getGlobal().console;
        if (console && console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                console.log(arguments); // ie fix: console.log.apply doesn't exist on ie
            }
        }
    };
}