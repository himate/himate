// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_edit.helpers({

    /**
     *
     */
    item: function() {
        return HiMate.Collections.Campaigns.findOne(Router.current().params._id);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_edit.onCreated(function() {
    Session.set('pageTitle', 'campaigns_edit');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_campaigns_edit"], {

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
