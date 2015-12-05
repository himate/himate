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
        'sendVoucherReservationEmail': function ( voucherCode) {
            if(Meteor.user()) {
                var mailTo = Meteor.user().emails[0].address;
                this.unblock();
                var message = 'Hi There,\n' +
                    userName + ' you reserved a vouchercode. ';

                message += 'this is it:' + voucherCode;
                Email.send({
                    to: mailTo,
                    from: "Waslchira" + ' <' + Meteor.settings.contacts.noreply + '>',
                    subject: 'waslchiraa vouchercode',
                    text: message
                });
            }

        },
    });


    Accounts.emailTemplates.siteName = 'Waslchiraa';
    Accounts.emailTemplates.from = 'Waslchiraa <' +  Meteor.settings.contacts.noreply + '>';
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return TAPi18n.__('email_registration_subject');
    };

    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        var result;
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
                        content: TAPi18n.__('email_registration_welcometext')
                    },
                    {
                        name: 'email_registration_complete_button',
                        content: TAPi18n.__('email_registration_complete_button')
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

    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return 'Reset you waslchiraa password';
    };

    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        var result;
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