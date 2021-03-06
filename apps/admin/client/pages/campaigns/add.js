// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_add.onCreated(function() {
    Session.set('pageTitle', 'campaigns_add');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_campaigns_add"], {

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

Template.pages_campaigns_add.events({

    /**
     *
     */
    'keyup textarea': function(event, template) {
        var max_length = $(event.currentTarget).attr('maxlength');
        if ((parseInt(max_length) - $(event.currentTarget).val().length) == 0) {
            HiMate.Helpers.errorMessage('0 characters left.');
        }
    }
});