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
        return Meteor.users.find();
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
