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
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            throw new Meteor.Error("not-authorized");
        }
    },

    /**
     *
     */
    "users_remove": function(id) {

        // security check
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
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
    },

    /**
     * @param {String} id
     */
    "users_toggle_disabled": function(id) {

        // security check
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            throw new Meteor.Error("not-authorized");
        }

        // cannot disable own account
        if (id == Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // action
        var user = Meteor.users.findOne(id);
        if (!user) {
            throw new Meteor.Error("not-found");
        }

        // toggle disabled
        if (!user.disabled) {

            // disable account
            Meteor.users.update({
                _id: id
            }, {
                $set: {
                    'disabled': true
                }
            });

            // Logout user
            Meteor.users.update(id, {
                $set: {
                    "services.resume.loginTokens": []
                }
            });

            Waslchiraa.Collections.Activities.insert({
                username: Meteor.user().username,
                userId: Meteor.userId(),
                entryId: id,
                role: 'admin',
                route: 'pages_users_edit',
                action: 'users_disable'
            });

            return "ok";
        }

        // reactivate account
        Meteor.users.update(id, {
            $set: {
                'disabled': false
            }
        });

        Waslchiraa.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: 'admin',
            route: 'pages_users_edit',
            action: 'users_enable'
        });

        return "ok";
    }
});
