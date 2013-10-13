define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/header'
], function ($, _, Backbone, template) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return Backbone.View.extend({
        el: 'header.page-header',

        initialize: function(options) {
            options = options || {};
            this.year = options.year;
            this.month = options.month;
        },

        events: {
            'click .pager-next': 'nextMonth',
            'click .pager-prev': 'prevMonth'
        },

        prevMonth: function() {
            Backbone.trigger('app:prevMonth');
        },

        nextMonth: function() {
            Backbone.trigger('app:nextMonth');
        },

        render: function() {
            var htmlData = {
                year: this.year,
                month: months[this.month]
            };

            this.$el.html(template(htmlData));

            return this;
        }
    });
});
