define([
    'jquery',
    'underscore',
    'backbone',
    'utils/monthGenerator',
    'jade!templates/calendar/month'
], function ($, _, Backbone, monthGenerator, template) {
    return Backbone.View.extend({
        el: 'section.month',

        initialize: function(options) {
            this.year = options.year;
            this.month = options.month;
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
