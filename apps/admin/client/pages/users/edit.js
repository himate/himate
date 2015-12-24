// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_users_edit.helpers({
    // :TODO:....
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_users_edit"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        Nugency.Helpers.infoMessage("ok");
    },

    /**
     *
     * @param {Object} formType
     * @param {Object} error
     */
    onError: function(formType, error) {
        if (error.reason) {
            Nugency.Helpers.errorMessage(error.reason);
        }
        else if (error.error) {
            Nugency.Helpers.errorMessage(error.error);
        }
    }
});
