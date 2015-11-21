Meteor.startup(function() {
    // observe voucher collection on non redeemed vouchers and handle remove
    Waslchiraa.Collections.Vouchers.find({redeemed:null}).observe({
        removed: function (voucher) {
            console.log('voucher deleted');
            var user = Meteor.users.findOne(voucher.userId);
            var campaign = Waslchiraa.Collections.Campaigns.findOne(voucher.campaignId);
            var email = {
                to:user.emails[0].address,
                from: TAPi18n.__('email_expired_from'),
                subject: TAPi18n.__('email_expired_subject', {
                    title: campaign.title
                }),
                text: TAPi18n.__('email_reserve_content', {
                    code: voucher.code
                }),
            };

            Email.send(email);
        },
    });
    // delete all expired vouchers every minute
    Meteor.setInterval(function () {
        var minDate = moment().subtract(1, 'day').toDate();
        Waslchiraa.Collections.Vouchers.remove({redeemed:null, reserved: {$lt:minDate}});
    }, 60000);
});
