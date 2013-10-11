define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/calendar/month'
], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        el: 'section.month',

        initialize: function() {

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
                days: daysArr
            };

            this.$el.html(template(htmlData));

            return this;
        }
    });
});
