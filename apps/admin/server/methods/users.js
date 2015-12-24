/**
 * server methods for Meteor.users
 */
Meteor.methods({

    /**
     * create new user, based on infos in <doc>
     * @param {Object} doc
     */
    "users_add": function(doc) {

        // security check
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error("not-authorized");
        }
    }
});
