require.config({
    paths: {
        'jasmine': './lib/jasmine-1.3.1/jasmine',
        'jasmine-html': './lib/jasmine-1.3.1/jasmine-html',
        'jasmine-json-reporter': './lib/json-reporter/json-reporter',
        'spec': './spec/'
    },
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-json-reporter': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['jasmine-html', 'jasmine-json-reporter'], function (jasmine, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();
    var jsonReporter = new jasmine.JSONReporter();

    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.addReporter(jsonReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = ['spec/SpecHelper', 'spec/PlayerSpec'];

    var currentWindowOnload = window.onload;

    require(specs, function () {
        jasmineEnv.execute();
    });

});