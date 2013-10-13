define([
    'jquery',
    'underscore',
    'backbone',
    'jade!templates/event'
], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        tagName: "article",
        className: "event",

        initialize: function(params) {
            this.options = params;

            this.model && this.model.on('destroy', this.remove, this);
        },

        events: {
            'click .closer': 'closerHandler',
            'click .eventTitle': 'titleHandler'
        },

        closerHandler: function() {
            if (this.options.canDestroy) {
                this.destroy();
            }
        },

        titleHandler: function() {
            if (this.options.canExpand) {
                this.expand();
            }
        },

        destroy: function() {
                this.model.destroy();
        },

        expand: function() {
            this.$('.eventText').toggleClass('.eventText-expanded');
            return this;
        },

        render: function() {
            var templateData = _.extend({}, this.model.toJSON(), this.options);

            this.$el.html(template(this.model.toJSON(templateData)));
            return this;
        }
    }, {
        renderEvent: function(params) {
            return (new this(params)).render();
        }
    });
});
