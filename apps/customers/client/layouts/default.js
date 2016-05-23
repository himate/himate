Template.layouts_default.events({
    /**
     */
    'click .dimmed': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    },
    /**
     */
    'touchstart .dimmed': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    }
});

Template.layouts_default.rendered = function() {
    var modalConnectionLost = $('.modal.connection-lost');
    modalConnectionLost.modal({
        closable: false
    });

    if (!connectionManager.status == connectionManager.STATUS_DISCONNECTED) {
        modalConnectionLost.modal('show');
    }

    connectionManager.onConnected = function () {
        modalConnectionLost.modal('hide');
    };
    connectionManager.onDisconnected = function () {
        modalConnectionLost.modal('show');
    };
};
