define([
    'jquery',
    'underscore',
    'backbone',
    'views/event',
    'jade!templates/calendar/day'
], function ($, _, Backbone, EventView, template) {
    return Backbone.View.extend({
        className: "dayPopup",

        initialize: function(options) {
            this.ts = options.ts;
            this.tsArr = this.ts.split("-");

            this.todayEvents = this.collection.getByDay.apply(
                this.collection, this.tsArr
            );
        },

        events: {
            'keyup .eventDescription': 'checkInput',
            'click': 'clickHandler'
        },

        checkInput: function(e) {
            var $input = $(e.target);

            if (e.keyCode === 13 && e.ctrlKey) {
                e.preventDefault();

                this.collection.add({
                    date: this.ts,
                    text: $input.val()
                });

                this.collection.saveAll();

                this.close();
            }
        },

        clickHandler: function(e) {
            e.stopPropagation();
        },

        bindEscape: function() {
            $('body').one('click', _.bind(this.close, this));

            $('body').on("keyup.dayPopup", _.bind(function(e) {
                if (e.keyCode === 27) {
                    this.close();
                    $('body').off("keyup.dayPopup");
                }
            }, this));
        },

        close: function() {
            this.trigger('dayView:destroyed');
            this.remove();
        },

        addNewEvent: function (model) {
            EventView.renderEvent({
                canDestroy: true,
                canExpand: true,
                model: model
            }).$el.appendTo(this.$('.events'));
        },

        addExistedEvents: function () {
            this.todayEvents.forEach(_.bind(
                this.addNewEvent, this));
        },

        render: function() {
            this.$el.html(template());

            this.addExistedEvents();

            this.bindEscape();

            return this;
        }
    });
});
