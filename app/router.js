define([
    'jquery',
    'underscore',
    'backbone',
    'views/index'
], function ($, _, Backbone, IndexView) {

    return Backbone.Router.extend({
        initialize: function(params) {
            this.params = params;
        },

        routes: {
            '': function() {
                var indexView = new IndexView();

                indexView.render();
            }
        }
    });
});
