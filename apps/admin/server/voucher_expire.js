Meteor.startup(function() {
    var minDate = moment().subtract(1, 'day').toDate();
    // observe voucher collection on non redeemed vouchers and handle remove
    HiMate.Collections.Vouchers.find({
        redeemed: null,
        reserved: {
            $lt: minDate
        }
    }).observe({
        removed: function(voucher) {
            var user = Meteor.users.findOne(voucher.userId);
            var campaign = HiMate.Collections.Campaigns.findOne(voucher.campaignId);
            var lang = 'en';
            if (user.lastLanguage && user.lastLanguage.length) {
                lang = user.lastLanguage;
            }
            var message = {

                "subject": TAPi18n.__('email_voucher_remove_subject'),
                "from_email": Meteor.settings.contacts.noreply,
                "from_name": "HiMate",
                "to": [{
                    "email": user.emails[0].address,
                    "type": "to"
                }],
                "global_merge_vars": [{
                    name: 'vouchercode',
                    content: voucher.code
                }, {
                    name: 'email_voucher_remove_text',
                    content: TAPi18n.__('email_voucher_remove_text', lang) + '(' + campaign.title[lang] + ')'
                }, {
                    name: 'email_header',
                    content: TAPi18n.__('email_header', lang)
                }],
            };

            HiMate.Collections.Campaigns.countVouchers(voucher.campaignId);

            Mandrill.messages.sendTemplate({
                template_name: 'waslchiraa_remove_vouchercode',
                template_content: [],
                'message': message
            });
        },
    });

    // delete all expired vouchers every minute
    Meteor.setInterval(function() {
        var minDate = moment().subtract(1, 'day').toDate();
        HiMate.Collections.Vouchers.remove({
            redeemed: null,
            reserved: {
                $lt: minDate
            }
        });
    }, 60000);
});
