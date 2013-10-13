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

        initialize: function(options) {
            options = options || {};
            var date = new Date();

            this.year = options.year || date.getFullYear();
            this.month = _.isUndefined(options.month) ?
                date.getMonth() : options.month;

            this.collection = new EventsCollection();
            this.collection.fetch();
        },

        render: function() {
            var headerView;
            var monthView;

            this.$el.html(layoutTemplate());

            headerView = new HeaderView({
                year: this.year,
                month: this.month
            });
            headerView.render();
            monthView = new MonthView({
                year: this.year,
                month: this.month,
                collection: this.collection
            });
            monthView.render();

            return this;
        }
    });
});
