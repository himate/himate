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
        var options = {
            sort: {
                published: -1
            }
        };

        var pageNumber = Session.get('pagination_page');
        var pageSize = Session.get('pagination_page_size');

        if (typeof pageNumber !== 'undefined') {
            options.limit = pageSize;
            options.skip = pageNumber * pageSize;
        }

        var locale = TAPi18n.getLanguage();
        if (Session.get('query')) {
            filter["title." + locale] = new RegExp(Session.get('query'), "gi");
        }

        return HiMate.Collections.Campaigns.find(filter, options);
    },

    dataCursor: function() {
        return HiMate.Collections.Campaigns.find();
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
