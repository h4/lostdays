define([
    'jquery',
    'underscore',
    'backbone',
    'views/index'
], function ($, _, Backbone, IndexView) {

    return Backbone.Router.extend({
        initialize: function(params) {
            this.params = params;
            var date = new Date();

            this.year = date.getFullYear()
            this.month = date.getMonth();

            Backbone.on('app:nextMonth', function(){
                this.month++;

                if (this.month == 12) {
                    this.month = 0;
                    this.year++;
                }

                this.navigate(this.year + '/' + (this.month + 1) + '/',
                    {trigger: true});
            }, this);

            Backbone.on('app:prevMonth', function(){
                this.month--;

                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }

                this.navigate(this.year + '/' + (this.month + 1) + '/',
                    {trigger: true});
            }, this);
        },

        monthRoute: function(year, month) {
            if (year && month) {
                this.year = year;
                this.month = month - 1;
            }

            var indexView = new IndexView({
                year: this.year,
                month: this.month
            });

            indexView.render();
        },

        routes: {
            '': 'monthRoute',
            ':year/:month/': 'monthRoute'
        }
    });
});
