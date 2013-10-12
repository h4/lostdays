define([
    'jquery',
    'underscore',
    'backbone',
    'views/calendar/day',
    'utils/monthGenerator',
    'jade!templates/calendar/month'
], function ($, _, Backbone, DayView, monthGenerator, template) {
    return Backbone.View.extend({
        el: 'section.month',
        popupOpened: false,

        initialize: function(options) {
            this.year = options.year;
            this.month = options.month;
        },

        events: {
            'click .day': 'addEvent'
        },

        addEvent: function(e) {
            var $day;
            var dayView;

            if (!this.popupOpened) {
                this.popupOpened = true;
                $day = $(e.currentTarget);

                dayView = new DayView({
                    collection: this.collection,
                    ts: $day.data('date')
                });

                dayView.render().$el.appendTo($day);
                dayView.on('dayView:destroyed', _.bind(function() {
                    this.popupOpened = false;
                }, this));
            }
        },

        render: function() {
            htmlData = {
                days: monthGenerator.getMonth(this.year, this.month),
                month: this.month,
                year: this.year
            };

            this.$el.html(template(htmlData));

            return this;
        }
    });
});
