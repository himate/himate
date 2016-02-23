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
        var filter = {};
        var locale = TAPi18n.getLanguage();
        if (Session.get('query')) {
            filter["title." + locale] = new RegExp(Session.get('query'), "gi");
        }

        return HiMate.Collections.Campaigns.find(filter, {
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
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('campaigns_remove', this._id, HiMate.Helpers.onAfterMethodCall);
        }
        return HiMate.Helpers.cancel(event);
    }
});
