// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers_edit.helpers({

    /**
     *
     */
    voucher: function() {
        return Vouchers.findOne(Router.current().params._id);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers_edit.onCreated(function() {
    Session.set('pageTitle', 'vouchers_edit');
});

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_vouchers_edit"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function(operation, result, template) {
        Waslchiraa.Helpers.infoMessage('ok');
        Router.go("pages_vouchers");
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
