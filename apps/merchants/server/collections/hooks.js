/**
 * @param {String} userId of currently logged in meteor user, if any
 * @param {doc} new data set to insert
 */
Meteor.users.before.insert(function(userId, doc) {
    doc.roles = ['merchant'];
    doc.username = doc.emails[0].address;
});

/**
 * @param {String} userId of currently logged in meteor user, if any
 * @param {doc} data set after insert, _id is the new object id
 */
Meteor.users.after.insert(function(userId, doc) {
    HiMate.Collections.Activities.insert({
        username: doc.username,
        userId: doc._id,
        role: 'merchant',
        entryId: doc._id,
        route: 'pages_users_edit',
        action: 'users_register'
    });
});
