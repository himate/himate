// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers_add.onCreated(function() {
    Session.set('pageTitle', 'vouchers_add');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_vouchers_add"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        App.Helpers.infoMessage('ok');
        Router.go("pages_vouchers");
    },

    /**
     *
     * @param {Object} formType
     * @param {Object} error
     */
    onError: function(formType, error) {
        if (error.reason) {
            App.Helpers.errorMessage(error.reason);
        }
        else if (error.error) {
            App.Helpers.errorMessage(error.error);
        }
    }
});
