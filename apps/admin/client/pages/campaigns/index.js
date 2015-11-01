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
        return Waslchiraa.Collections.Campaigns.find();
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
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('campaigns_remove', this._id);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});
