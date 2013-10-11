define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/calendar/month',
    'jade!templates/layout','jade!templates/layout',
    'styl!/s/styles'
], function ($, _, Backbone, HeaderView, MonthView, layoutTemplate) {

    return Backbone.View.extend({
        el: '.app',

        render: function() {
            var headerView;
            var monthView;

            this.$el.html(layoutTemplate());

            headerView = new HeaderView();
            headerView.render();
            monthView = new MonthView({year: 2013, month: 9});
            monthView.render();

            return this;
        }
    });
});
