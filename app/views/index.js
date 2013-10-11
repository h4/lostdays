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
            this.eventsCollection = new EventsCollection();
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
                eventsCollection: this.eventsCollection
            });
            monthView.render();

            return this;
        }
    });
});
