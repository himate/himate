Meteor.startup(function() {

    // delete all expired vouchers every minute
    Meteor.setInterval(function() {
        var minDate = moment().subtract(14, 'days').toDate();
        HiMate.Collections.Vouchers.find({
            redeemed: null,
            reserved: {
                $lt: minDate
            }
        }).fetch().forEach(function(voucher){
            console.log('send removal', voucher);
            HiMate.Collections.Vouchers.remove({_id:voucher._id});
            var user = Meteor.users.findOne(voucher.userId);
            var campaign = HiMate.Collections.Campaigns.findOne(voucher.campaignId);
            var lang = 'en';
            if (user.lastLanguage && user.lastLanguage.length) {
                lang = user.lastLanguage;
            }


            var message = Handlebars.templates['remove_vouchercode']({
                'vouchercode': voucher.code,
                'email_voucher_remove_text': TAPi18n.__('email_voucher_remove_text', lang) + ' (' + campaign.title[lang] + ')',
                'email_header':TAPi18n.__('email_header', lang)
            });

            HiMate.Collections.Campaigns.countVouchers(voucher.campaignId);

            Email.send({
                to: user.emails[0].address,
                from: Meteor.settings.contacts.noreply,
                subject: TAPi18n.__('email_voucher_remove_subject'),
                html: message
            });
        });
    }, 60000);
});
