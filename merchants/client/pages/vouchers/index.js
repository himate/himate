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
    },
    'testtrans':function(){
         Meteor.call('translate_text','Wie heisst Du?','de', 'en', function(err, result){
             Session.set('trans', result);
        });
        return Session.get('trans')

    }

});

Template.pages_vouchers_voucher.helpers({


});

// ----- template events ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    'click table .remove': function(event) {
        // :TODO: use semantic ui dialog & translate
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('vouchers_remove', this._id);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});


Template.pages_vouchers_voucher.events({


});


// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.onCreated(function() {
    Session.set('pageTitle', 'vouchers');
});


