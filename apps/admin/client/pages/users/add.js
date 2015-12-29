// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["users_add"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        Router.go("pages_users");
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
