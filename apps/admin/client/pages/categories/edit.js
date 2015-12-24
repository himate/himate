// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_categories_edit.helpers({

    /**
     *
     */
    category: function() {
        return Waslchiraa.Collections.Categories.findOne(Router.current().params._id);
    }
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["categories_edit"], {

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
