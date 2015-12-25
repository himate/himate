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
    },

    /**
     *
     */
    "users_remove": function(id) {

        // security check
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error("not-authorized");
        }

        // cannot delete own account
        if (id == Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // :TODO: delete all additional data (campaigns, vouchers) of this user
        var result = Meteor.users.remove(id);

        Waslchiraa.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: 'admin',
            route: '',
            action: 'users_remove'
        });

        return result;
    }
});
