define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'jade!templates/layout',
    'styl!/s/styles'
], function ($, _, Backbone, HeaderView, layoutTemplate) {

    return Backbone.View.extend({
        el: '.app',

        render: function() {
            var headerView;
            var data = [[], [], [], [], []];
            var i=31;
            while (i) {
                data[Math.ceil(i/7)-1].unshift(i);
                i--;
            }
            this.$el.html(layoutTemplate({days: data}));

            headerView = new HeaderView();
            headerView.render();
        }
    });
});
