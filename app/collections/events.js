define([
    'jquery',
    'underscore',
    'backbone',
    'models/event'
], function ($, _, Backbone, EventModel) {
    return Backbone.Collection.extend({
        model: EventModel,

        saveAll: function() {
            this.sync('update', this);
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
