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

            this.eventsCollection = options.eventsCollection;
        },

        events: {
            'click .day': 'addEvent'
        },

        addEvent: function(e) {
            var $day;
            var dayView;

            if (!this.popupOpened) {
                this.popupOpened = true;

                $day = $(e.target);
                    dayView = new DayView({
                    collection: this.eventsCollection,
                    ts: $day.data('date')
                });

                dayView.render().$el.appendTo($day);
                dayView.on('dayView:destroyed', _.bind(function() {
                    this.popupOpened = false;

                    console.log(this.eventsCollection.toJSON());
                }, this));
            }
        },

        render: function() {
            var daysArr = [[], [], [], [], []];
            var i=31;
            var htmlData;

            while (i) {
                daysArr[Math.ceil(i/7)-1].unshift(i);
                i--;
            }

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
