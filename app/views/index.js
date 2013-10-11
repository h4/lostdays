define([
    'jquery',
    'underscore',
    'backbone',
    'collections/events',
    'views/header',
    'views/calendar/month',
    'jade!templates/layout','jade!templates/layout',
    'styl!/s/styles'
], function ($, _, Backbone, EventsCollection, HeaderView, MonthView, layoutTemplate) {

    return Backbone.View.extend({
        el: '.app',

        initialize: function() {
            this.collection = new EventsCollection();
        },

        render: function() {
            var headerView;
            var monthView;

            this.$el.html(layoutTemplate());

            headerView = new HeaderView();
            headerView.render();
            monthView = new MonthView({
                year: 2013,
                month: 9,
                collection: this.collection
            });
            monthView.render();

            return this;
        }
    });
});
