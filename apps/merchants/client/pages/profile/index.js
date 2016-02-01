// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_profile.onCreated(function() {
    Session.set('pageTitle', 'profile');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_profile"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        HiMate.Helpers.infoMessage('ok');
        Router.go("pages_campaigns");
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
