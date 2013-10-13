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

        bindEscape: function() {
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

        render: function() {
            this.$el.html(template());
            var eventView;

            this.todayEvents.forEach(_.bind(function(elem) {
                eventView = new EventView({
                    canDestroy: true,
                    canExpand: true,
                    model: elem
                }).render().$el.appendTo(this.$('.events'));
            }, this));

            this.bindEscape();

            return this;
        }
    });
});
