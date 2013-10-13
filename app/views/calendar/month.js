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

            this.collection.on('add', this.addNewEvent, this);
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

        addExistedEvents: function() {
            this.currentEvents.forEach(_.bind(this.addNewEvent));
        },

        addNewEvent: function(model) {
            new EventView({
                canDestroy: false,
                canExpand: false,
                model: model
            }).render().$el.appendTo(this.$('.day[data-date="' + model.get('date') + '"]').find('.events'));
        },

        render: function() {
            var htmlData = {
                days: monthGenerator.getMonth(this.year, this.month),
                month: this.month,
                year: this.year
            };

            this.$el.html(template(htmlData));
            this.addExistedEvents();

            return this;
        }
    });
});
