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
                published: -1
            }
        });
    }
});

// ----- template events ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.events({

    /**
     *
     */
    'click table .remove': function(event) {
        // :TODO: use semantic ui dialog & translate
        if (confirm('Delete Voucher "' + this.title[TAPi18n.getLanguage()] + '"?')) {
            Meteor.call('campaigns_remove', this._id);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.onCreated(function() {
    Session.set('pageTitle', 'campaigns');
});
