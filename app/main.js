require.config({
    "baseUrl": "app",
    "shim": {
        "backbone": {
            "deps": [
                'underscore',
                'jquery'
            ],
            "exports": 'Backbone'
        }
    },
    "paths": {
        "backbone": "../libs/backbone/backbone",
        "jade": "../libs/require-jade/jade",
        "jquery": "../libs/jquery/jquery",
        "underscore": "../libs/lodash/dist/lodash.underscore"
    },
    "map": {
        "*": {
            "styl": "../libs/require-stylus/require-stylus",
            "stylus": "../libs/require-stylus/stylus"
        }
    }
});

require([
    'app'
], function(app) {
    app.initialize();
});