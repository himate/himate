// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_categories_add.onCreated(function() {
    Session.set('pageTitle', 'categories_add');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_categories_add"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        Waslchiraa.Helpers.infoMessage('ok');
        Router.go("pages_categories");
    },

    /**
     *
     * @param {Object} formType
     * @param {Object} error
     */
    onError: function(formType, error) {
        if (error.reason) {
            Waslchiraa.Helpers.errorMessage(error.reason);
        }
        else if (error.error) {
            Waslchiraa.Helpers.errorMessage(error.error);
        }
    }
});
