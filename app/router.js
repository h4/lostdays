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

        index: function() {
            var indexView = new IndexView();

            indexView.render();
        },

        month: function(year, month) {
            var indexView = new IndexView({
                year: year,
                month: month
            });

            indexView.render();
        },

        routes: {
            '': 'index',
            'year:/month:': 'month'
        }
    });
});
