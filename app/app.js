define([
    'backbone',
    'router'
], function (Backbone, Router) {

    return {
        initialize: function(params) {
            params = params || {};
            params.router = params.router || {};

            var appRouter = new Router(params.router);

            Backbone.history.start({
                pushState: true
            });

            Backbone.history.navigate('', {trigger: true});

            Backbone.on("domchange:title", function(title) {
                $(document).attr('title', title);
            });
        }
    };
});
