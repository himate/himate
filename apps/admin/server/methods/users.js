/**
 * server methods for Meteor.users
 */
Meteor.methods({

    /**
     * create new user, based on infos in <doc>
     * @param {Object} doc
     */
    "users_add": function(doc) {

        // check user input
        check(doc, Object);
        check(doc.email, String);
        check(doc.role, String);
        check(doc.firstName, Match.Optional(String));
        check(doc.lastName, Match.Optional(String));
        check(doc.password, Match.Optional(String));
        check(doc.password2, Match.Optional(String));

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            throw new Meteor.Error("not-authorized");
        }

        if (!doc.password) {
            throw new Meteor.Error("new users need a password.");
        }

        if (doc.password != doc.password2) {
            throw new Meteor.Error("passwords don't match.");
        }

        // action
        var userId = Accounts.createUser({
            username: doc.email,
            email: doc.email,
            password: doc.password
        });

        // add minimal profile, verify email, set role
        Meteor.users.update(userId, {
            $set: {
                "profile.firstName": doc.firstName,
                "profile.lastName": doc.lastName,
                "emails.0.verified": true,
                "roles": [doc.role]
            }
        }, {
            validate: false
        });

        // log activity
        Waslchiraa.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: userId,
            role: 'admin',
            route: 'pages_users_edit',
            action: 'users_add'
        });

        return userId;
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
