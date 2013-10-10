define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/layout',
    'styl!/s/styles'
], function ($, _, Backbone, layoutTemplate) {

    return Backbone.View.extend({
        el: '.app',

        render: function() {
            var data = [[], [], [], [], []];
            var i=31;
            while (i) {
                data[Math.ceil(i/7)-1].unshift(i);
                i--;
            }
            this.$el.html(layoutTemplate({days: data}));
        }
    });
});
