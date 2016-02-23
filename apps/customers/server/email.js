Meteor.startup(function() {
    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(Meteor.settings.mandrill.username) + ':' +
        encodeURIComponent(Meteor.settings.mandrill.apiKey) + '@' +
        encodeURIComponent(Meteor.settings.mandrill.smtp.server) + ':' +
        Meteor.settings.mandrill.smtp.port;

    Mandrill.config({
        username: Meteor.settings.mandrill.username,
        key: Meteor.settings.mandrill.apiKey,
    });
    Meteor.methods({
        'send_voucher_reservation_email': function (voucherCode) {
            if(Meteor.user()) {
                var mailTo = Meteor.user().emails[0].address;
                var lang = 'en';
                if(Meteor.user().lastLanguage && Meteor.user().lastLanguage.length){
                    lang = Meteor.user().lastLanguage;
                }

                var message = {
                    "subject": TAPi18n.__('email_voucher_reservation_subject'),
                    "from_email":  Meteor.settings.contacts.noreply,
                    "from_name": "HiMate",
                    "to": [{
                        "email":mailTo,
                        "type": "to"
                    }],
                    "global_merge_vars": [
                        {
                            name: 'vouchercode',
                            content: voucherCode
                        },
                        {
                            name: 'email_voucher_reservation_text_intro',
                            content: TAPi18n.__('email_voucher_reservation_text_intro', lang)
                        },
                        {
                            name: 'email_voucher_reservation_text_conditions',
                            content: TAPi18n.__('email_voucher_reservation_text_conditions', lang)
                        },
                        {
                            name: 'email_header',
                            content: TAPi18n.__('email_header', lang)
                        }
                    ],
                };
                Mandrill.messages.sendTemplate({
                    template_name: 'waslchiraa_send_vouchercode',
                    template_content: [],
                    'message': message
                });
            }

        },
    });


    Accounts.emailTemplates.siteName = 'HiMate';
    Accounts.emailTemplates.from = 'HiMate <' +  Meteor.settings.contacts.noreply + '>';
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return TAPi18n.__('email_registration_subject');
    };

    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        var result;
        var lang = 'en';
        if(user.lastLanguage && user.lastLanguage.length){
            lang = user.lastLanguage;
        }
        try {
            result = Mandrill.templates.render({
                template_name: 'waslchiraa-registration',
                template_content: [],
                merge_vars: [
                    {
                        name: 'URL',
                        content: url
                    },
                    {
                        name: 'email_registration_welcometext',
                        content: TAPi18n.__('email_registration_welcometext',lang)
                    },
                    {
                        name: 'email_registration_complete_button',
                        content: TAPi18n.__('email_registration_complete_button',lang)
                    },
                    {
                        name: 'email_header',
                        content: TAPi18n.__('email_header',lang)
                    },
                    {
                        name: 'email_link',
                        content: TAPi18n.__('email_link',lang)
                    },
                ],
            });
        } catch (error) {
            console.error('Error while rendering Mandrill template', error);
        }
        return result.data.html;
    };

    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return 'Reset you himate password';
    };

    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        var result;
        var lang = 'en';
        if(user.lastLanguage && user.lastLanguage.length){
            lang = user.lastLanguage;
        }
        try {
            result = Mandrill.templates.render({
                template_name: 'waslchiraa-forgot-password',
                template_content: [

                ],
                merge_vars: [
                    {
                        name: 'URL',
                        content: url
                    },
                    {
                        name: 'email_forgot_password_text',
                        content: TAPi18n.__('email_forgot_password_text')
                    },
                    {
                        name: 'email_forgot_password_reset_button',
                        content: TAPi18n.__('email_forgot_password_reset_button')
                    },
                    {
                        name: 'email_header',
                        content: TAPi18n.__('email_header')
                    },
                    {
                        name: 'email_link',
                        content: TAPi18n.__('email_link')
                    },
                ],
            });
        } catch (error) {
            console.error('Error while rendering Mandrill template', error);
        }
        return result.data.html;
    };
});