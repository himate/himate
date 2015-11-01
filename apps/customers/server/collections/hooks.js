Meteor.users.before.insert(function (userId, doc) {
    doc.roles = ['customer'];
});