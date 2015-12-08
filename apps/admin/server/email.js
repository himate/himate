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
});