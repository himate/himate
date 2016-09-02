Template.campaigns.helpers({

    /**
     * return all campaigns
     * @reactive
     */
    campaigns: function () {
        return HiMate.Helpers.customers.campaigns.campaigns();
    },

    /**
     *
     */
    category: function () {
        return HiMate.Helpers.customers.campaigns.category();
    }
});