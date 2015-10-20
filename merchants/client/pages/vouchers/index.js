// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all vouchers
     * @reactive
     */
    vouchers: function() {
        return Vouchers.find({}, {
            sort: {
                title: 1
            }
        });
    }
});

// ----- template events ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     *
     */
    'click table .remove': function(event) {
        // :TODO: use semantic ui dialog & translate
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('vouchers_remove', this._id);
        }
        return App.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.onCreated(function() {
    Session.set('pageTitle', 'vouchers');
});
