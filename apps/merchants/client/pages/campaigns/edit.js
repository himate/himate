// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_edit.helpers({

    /**
     *
     */
    item: function() {
        return Waslchiraa.Collections.Campaigns.findOne(Router.current().params._id);
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
        Waslchiraa.Helpers.infoMessage('ok');
        Router.go("pages_campaigns");
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
