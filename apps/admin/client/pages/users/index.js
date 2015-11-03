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
        return Meteor.users.find(filter);
    },

    /**
     *
     */
    firstEmail: function(user) {
        if (user.emails && user.emails[0]) {
            return user.emails[0].address;
        }
        return "";
    }
});

