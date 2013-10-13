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
            this._year = options.year || (new Date).getFullYear();
            this._month = options.month || (new Date).getMonth();
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
                year: this._year,
                month: months[this._month]
            };

            this.$el.html(template(htmlData));

            return this;
        }
    });
});
