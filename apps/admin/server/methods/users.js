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
        check(doc.verifiedEmail, Boolean);
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
                "emails.0.verified": doc.verifiedEmail,
                "roles": [doc.role]
            }
        }, {
            validate: false
        });

        // log activity
        HiMate.Collections.Activities.insert({
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
     * update user
     * @param {String} id
     * @param {Object} doc
     */
    "users_edit": function(doc, id) {

        // check user input
        check(id, String);

        check(doc, Object);
        check(doc.$set, Object);
        check(doc.$set.email, String);
        check(doc.$set.verifiedEmail, Boolean);
        check(doc.$set.role, String);
        check(doc.$set.firstName, Match.Optional(String));
        check(doc.$set.lastName, Match.Optional(String));
        check(doc.$set.password, Match.Optional(String));
        check(doc.$set.password2, Match.Optional(String));

        check(doc.$unset, Match.Optional({
            firstName: Match.Optional(String),
            lastName: Match.Optional(String),
            password: Match.Optional(String),
            password2: Match.Optional(String)
        }));

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            throw new Meteor.Error("not-authorized");
        }

        if (doc.$set.password != doc.$set.password2) {
            throw new Meteor.Error("passwords don't match.");
        }

        // duplicate email check (we use <username>!)
        // :TODO: get rid of this <username> stuff (all apps) - or make sth. useful w/ it...
        var duplicateEmailCheck = Meteor.users.findOne({
            _id: {
                $ne: id
            },
            "username": doc.$set.email
        });
        if (duplicateEmailCheck) {
            throw new Meteor.Error("email address already in use.");
        }

        // action
        Meteor.users.update(id, {
            $set: {
                "username": doc.$set.email,
                "profile.firstName": doc.$set.firstName,
                "profile.lastName": doc.$set.lastName,
                "emails.0.address": doc.$set.email,
                "emails.0.verified": doc.$set.verifiedEmail,
                "roles": [doc.$set.role]
            }
        }, {
            validate: false
        });

        // log activity
        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: 'admin',
            route: 'pages_users_edit',
            action: 'users_edit'
        });

        // set new password, if any
        if (doc.$set.password && doc.$set.password == doc.$set.password2) {
            Accounts.setPassword(id, doc.$set.password);

            // log activity
            HiMate.Collections.Activities.insert({
                username: Meteor.user().username,
                userId: Meteor.userId(),
                entryId: id,
                role: 'admin',
                route: 'pages_users_edit',
                action: 'users_password_change'
            });
        }

        return id;
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

        HiMate.Collections.Activities.insert({
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

            HiMate.Collections.Activities.insert({
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

        HiMate.Collections.Activities.insert({
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
