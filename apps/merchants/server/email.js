Meteor.startup(function() {
    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(Meteor.settings.smtp.username) + ':' +
        encodeURIComponent(Meteor.settings.smtp.password) + '@' +
        encodeURIComponent(Meteor.settings.smtp.server) + ':' +
        Meteor.settings.smtp.port;

    Meteor.methods({
    });


    Accounts.emailTemplates.siteName = 'HiMate';
    Accounts.emailTemplates.from = 'HiMate <' +  Meteor.settings.contacts.noreply + '>';
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return TAPi18n.__('email_registration_subject');
    };

    Accounts.emailTemplates.verifyEmail.html = function (user, url) {

        // try {
        //     result = Mandrill.templates.render({
        //         template_name: 'waslchiraa-registration',
        //         template_content: [],
        //         merge_vars: [
        //             {
        //                 name: 'URL',
        //                 content: url
        //             },
        //             {
        //                 name: 'email_registration_welcometext',
        //                 content: TAPi18n.__('email_registration_welcometext')
        //             },
        //             {
        //                 name: 'email_registration_complete_button',
        //                 content: TAPi18n.__('email_registration_complete_button')
        //             },
        //             {
        //                 name: 'email_header',
        //                 content: TAPi18n.__('email_header')
        //             },
        //             {
        //                 name: 'email_link',
        //                 content: TAPi18n.__('email_link')
        //             },
        //         ],
        //     });
        // } catch (error) {
        //     console.error('Error while rendering Mandrill template', error);
        // }
        var lang = 'en';
        if(user.lastLanguage && user.lastLanguage.length){
            lang = user.lastLanguage;
        }

        var message = Handlebars.templates['registration']({
            'url': url,
            'email_registration_welcometext': TAPi18n.__('email_registration_welcometext', lang),
            'email_registration_complete_button':TAPi18n.__('email_registration_complete_button', lang),
            'email_header':TAPi18n.__('email_header', lang),
            'email_link':TAPi18n.__('email_link', lang)
        });
        return message;
    };

    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return 'Reset you himate password';
    };

    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        // var result;
        // try {
        //     result = Mandrill.templates.render({
        //         template_name: 'waslchiraa-forgot-password',
        //         template_content: [
        //
        //         ],
        //         merge_vars: [
        //             {
        //                 name: 'URL',
        //                 content: url
        //             },
        //             {
        //                 name: 'email_forgot_password_text',
        //                 content: TAPi18n.__('email_forgot_password_text')
        //             },
        //             {
        //                 name: 'email_forgot_password_reset_button',
        //                 content: TAPi18n.__('email_forgot_password_reset_button')
        //             },
        //             {
        //                 name: 'email_header',
        //                 content: TAPi18n.__('email_header')
        //             },
        //             {
        //                 name: 'email_link',
        //                 content: TAPi18n.__('email_link')
        //             },
        //         ],
        //     });
        // } catch (error) {
        //     console.error('Error while rendering Mandrill template', error);
        // }
        var lang = 'en';
        if(user.lastLanguage && user.lastLanguage.length){
            lang = user.lastLanguage;
        }
        var message = Handlebars.templates['forgot_password']({
            'url': url,
            'email_forgot_password_text': TAPi18n.__('email_forgot_password_text', lang),
            'email_forgot_password_reset_button':TAPi18n.__('email_forgot_password_reset_button', lang),
            'email_header':TAPi18n.__('email_header', lang),
            'email_link':TAPi18n.__('email_link', lang)
        });
        return message;
    };
});