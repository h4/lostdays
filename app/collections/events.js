define([
    'jquery',
    'underscore',
    'backbone',
    'models/event'
], function ($, _, Backbone, EventModel) {
    return Backbone.Collection.extend({
        model: EventModel,

        comparator: 'date',

        saveAll: function() {
            this.sync('update', this);
        },

        getByMonth: function(month, year) {
            return this.filter(function(model) {
                var dateArr = model.get('date').split('-');
                return dateArr[0] == year && dateArr[1] == month;
            });
        },

        getbyDay: function(day, month, year) {
            return this.filter(function(model) {
                return model.get('date') === year + "-" + month + "-" + day;
            });
        },

        sync: function(method, collection) {
            if (method == 'read') {
                if ('localStorage' in window) {
                    var items = localStorage.getItem('events');

                    if (items) {
                        collection.set(JSON.parse(items));
                    }
                }
            }
            if (method == 'create' || 'update') {
                if ('localStorage' in window) {
                    localStorage.setItem('events', JSON.stringify(collection.toJSON()));
                }
            }
        }
    });
});
