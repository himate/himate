// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.helpers({

    /**
     * return all campaigns
     * @reactive
     */
    campaigns: function() {
        return Waslchiraa.Collections.Campaigns.find({}, {
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

Template.pages_campaigns_voucher.helpers({


});

// ----- template events ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.events({

    'click table .remove': function(event) {
        // :TODO: use semantic ui dialog & translate
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('campaigns_remove', this._id);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});


Template.pages_campaigns_voucher.events({


});


// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.onCreated(function() {
    Session.set('pageTitle', 'campaigns');
});


