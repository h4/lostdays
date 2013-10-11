define([
    'jquery',
    'underscore',
    'backbone',
    'utils/monthGenerator',
    'jade!templates/calendar/month'
], function ($, _, Backbone, monthGenerator, template) {
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
                days: monthGenerator.getMonth(2013, 9)
            };

            this.$el.html(template(htmlData));

            return this;
        }
    });
});
