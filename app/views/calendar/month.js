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
        popupIsOpen: false,

        initialize: function(options) {
            this.year = options.year;
            this.month = options.month;

            this.days = monthGenerator.getMonth(this.year, this.month, true);
            this.currentEvents = this.collection.getBetweenDates(
                this.days[0][0].date, _.last(_.last(this.days)).date);
            this.collection.on('add', this.addNewEvent, this);
        },

        events: {
            'click .day': 'addEvent'
        },

        addEvent: function(e) {
            var $day;
            var dayView;

            if (!this.popupIsOpen) {
                this.popupIsOpen = true;
                $day = $(e.currentTarget);

                dayView = new DayView({
                    collection: this.collection,
                    ts: $day.data('date')
                });

                dayView.render().$el.appendTo($day);
                dayView.on('dayView:destroyed', _.bind(function() {
                    this.popupIsOpen = false;
                }, this));
            }
        },

        addExistedEvents: function() {
            this.currentEvents.forEach(_.bind(this.addNewEvent));
        },

        addNewEvent: function(model) {
            EventView.renderEvent({
                canDestroy: false,
                canExpand: false,
                model: model
            }).$el.appendTo(this.$('.day[data-date="' + model.get('date') + '"]')
                    .find('.events'));
        },

        countEvents: function() {
            this.$('.day').each(function(index, elem) {
                var $elem = $(elem);
                var count = $elem.find('.event').length;
                var $counter = $elem.find('.events-counter');

                if (count > 1) {
                    $counter.text(count + " events");
                } else {
                    $counter.text = "&nbsp;";
                }
            });
        },

        render: function() {
            var htmlData = {
                days: this.days,
                month: this.month,
                year: this.year
            };

            this.$el.html(template(htmlData));
            this.addExistedEvents();
            this.countEvents();

            return this;
        }
    });
});
