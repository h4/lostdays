define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/layout'
], function ($, _, Backbone, layoutTemplate) {

    return Backbone.View.extend({
        el: '.app',

        render: function() {
            this.$el.html(layoutTemplate());
        }
    });
});
