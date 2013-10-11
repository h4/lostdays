define([
    'jquery',
    'underscore',
    'backbone',
    'models/event'
], function ($, _, Backbone, EventModel) {
    return Backbone.Collection.extend({
        model: EventModel
    });
});
