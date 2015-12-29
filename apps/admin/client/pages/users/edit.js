// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_users_edit.helpers({

    /**
     *
     */
    user: function() {
        var u = Meteor.users.findOne(Router.current().params._id);
        if (u) {
            if (Roles.userIsInRole(u._id, 'admin')) {
                Router.go('pages_users');
            }

            return {
                _id: u._id,
                firstName: u.profile.firstName,
                lastName: u.profile.lastName,
                email: u.emails[0].address,
                verifiedEmail: u.emails[0].verified,
                role: u.roles[0]
            };
        }

        return false;
    }
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["users_edit"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        HiMate.Helpers.infoMessage("ok");
        Router.go('pages_users');
    },

    /**
     *
     * @param {Object} formType
     * @param {Object} error
     */
    onError: function(formType, error) {
        if (error.reason) {
            HiMate.Helpers.errorMessage(error.reason);
        }
        else if (error.error) {
            HiMate.Helpers.errorMessage(error.error);
        }
    }
});
