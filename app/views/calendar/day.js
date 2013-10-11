define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/calendar/day'
], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        className: "dayPopup",

        initialize: function(options) {
            this.ts = options.ts;
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

                this.close();
            }
        },

        close: function() {
            this.trigger('dayView:destroyed');
            this.remove();
        },

        render: function() {
            this.$el.html(template({
                events: {}
            }));

            return this;
        }
    });
});
