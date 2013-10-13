define([
    'jquery',
    'underscore',
    'backbone',
    'views/calendar/day',
    'views/event',
    'utils/monthGenerator',
    'jade!templates/calendar/month'
], function ($, _, Backbone, DayView, EventView, monthGenerator, template) {
    return Backbone.View.extend({
        el: 'section.month',
        popupOpened: false,

        initialize: function(options) {
            this.year = options.year;
            this.month = options.month;

            this.currentEvents = this.collection.getByMonth(this.year, this.month);
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

        showEvents: function() {
            var eventView;

            this.currentEvents.forEach(_.bind(function(elem) {
                eventView = new EventView({
                    canDestroy: false,
                    canExpand: false,
                    model: elem
                }).render().$el.appendTo(this.$('.day[data-date="' + elem.get('date') + '"]').find('.events'));
            }));
        },

        render: function() {
            htmlData = {
                days: monthGenerator.getMonth(this.year, this.month),
                month: this.month,
                year: this.year
            };

            this.$el.html(template(htmlData));
            this.showEvents();

            return this;
        }
    });
});
