ConnectionManager = function(props) {
    this.STATUS_DISCONNECTED = 'disconnected';
    this.STATUS_INITIAL_CONNECTING = 'initial connecting';
    this.STATUS_CONNECTED = 'connected';

    this.updateDelay = props.updateDelay || 1000;
    this.onConnected = props.onConnected || function() {};
    this.onDisconnected = props.onDisconnected || function() {};
    this.onInitialConnecting = props.onInitialConnecting || function() {};
    this.status = this.STATUS_DISCONNECTED;

    this.startObserve(this.updateDelay);
};

ConnectionManager.prototype = {
    ///////////////////////////////////////////////////////////////////
    //                           Public API                          //
    ///////////////////////////////////////////////////////////////////
    startObserve: function(updateDelay) {
        this.stopObserve();
        this.onUpdate();
        var self = this;
        this.updateInterval = Meteor.setInterval(function() {
            self.onUpdate();
        }, updateDelay);
    },
    stopObserve: function() {
        if (this.updateInterval) {
            Meteor.clearInterval(this.updateInterval);
        }
    },

    ///////////////////////////////////////////////////////////////////
    //        Private functions. Don't call them from outside        //
    ///////////////////////////////////////////////////////////////////
    onUpdate: function() {
        var status = this.getCurStatusFromMeteorStatus();
        if (status == this.status) return;

        this.status = status;
        switch (this.status) {
            case this.STATUS_INITIAL_CONNECTING:
                this.onInitialConnecting();
                break;

            case this.STATUS_CONNECTED:
                this.onConnected();
                break;

            case this.STATUS_DISCONNECTED:
                this.onDisconnected();
                break;

            default:
                console.log('Unhandled connection status type');
                break;
        }
    },
    getCurStatusFromMeteorStatus: function() {
        var status = Meteor.status();
        if (status.status == 'connecting' && status.retryCount == 0) {
            return this.STATUS_INITIAL_CONNECTING;
        }
        return status.connected ? this.STATUS_CONNECTED : this.STATUS_DISCONNECTED;
    }
};

connectionManager = new ConnectionManager({});