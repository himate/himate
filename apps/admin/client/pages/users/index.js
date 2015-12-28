// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_users.helpers({

    /**
     * return all users
     * @reactive
     */
    users: function() {
        var filter = {};
        if (Session.get('query')) {
            filter.username = new RegExp(Session.get('query'), "gi");
        }
        return Meteor.users.find(filter, {
            sort: {
                createdAt: 1
            }
        });
    },

    /**
     * @param {Object} user
     * @return {Boolean}
     */
    checkVerifiedEmail: function(user) {
        if (user.emails && user.emails[0]) {
            return user.emails[0].verified;
        }
        return false;
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_users.events({

    /**
     * @param {Object} event
     */
    "click .remove-user": function(event) {
        if (confirm('Delete User "' + this.username + '"?')) {
            Meteor.call("users_remove", this._id, Waslchiraa.Helpers.onAfterMethodCall);
        }
        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     * @param {Object} event
     */
    "click .toggle.state": function(event) {
        if (confirm('Toggle account state for "' + this.username + '"?')) {
            Meteor.call("users_toggle_disabled", this._id, Waslchiraa.Helpers.onAfterMethodCall);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});
