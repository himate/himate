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
        var result = Waslchiraa.Collections.Campaigns.findOne({_id:Router.current().params._id});
        console.log(Router.current().params._id, result);
        return result;
    }
});


Template.pages_campaigns_details.events({
    'click .js-reserve-voucher': function (event, template) {
        var voucher = Waslchiraa.Collections.Campaigns.findOne(Router.current().params._id);
        if(voucher) {
            var vouchercode = Meteor.call('reserve_voucher',voucher._id.toString(), function(err, data){
                console.log( err, data);
                if(err) {
                    Waslchiraa.Helpers.errorMessage(err.message);
                }else{
                    Waslchiraa.Helpers.infoMessage('voucher ' + data + ' has been reserved');
                }
            });
        }
    },
});
