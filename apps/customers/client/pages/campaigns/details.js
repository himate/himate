// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_details.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    item: function() {
        var result = Waslchiraa.Collections.Campaigns.findOne({
            _id: Router.current().params._id
        });
        return result;
    }
});

// ----- templat events --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_details.events({

    /**
     * @param {Object} event
     * @param {Object} template
     */
    'click .js-reserve-voucher': function(event, template) {
        var voucher = Waslchiraa.Collections.Campaigns.findOne(Router.current().params._id);
        if (voucher) {
            var vouchercode = Meteor.call('vouchers_reserve', voucher._id.toString(), function(err, data) {
                if (err) {
                    Waslchiraa.Helpers.errorMessage(err.message);
                }
                else {
                    Waslchiraa.Helpers.infoMessage('voucher ' + data + ' has been reserved');
                }
            });
        }
    },
});
