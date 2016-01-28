/**
 * @param {String} userId of currently logged in meteor user, if any
 * @param {doc} new data set to insert
 */
Meteor.users.before.insert(function(userId, doc) {
    console.log(doc);
    doc.roles = ['customer'];
    if(doc.services && doc.services.facebook && doc.services.facebook.email){
        doc.emails = [{
            address:doc.services.facebook.email,
            verified:true
        }];
    }
    doc.username = doc.emails[0].address;
    console.log(doc);
});

/**
 * @param {String} userId of currently logged in meteor user, if any
 * @param {doc} data set after insert, _id is the new object id
 */
Meteor.users.after.insert(function(userId, doc) {
    var action = 'users_register';
    if(doc.services && doc.services.facebook){
        action +='_facebook';
    }
    HiMate.Collections.Activities.insert({
        username: doc.username,
        userId: doc._id,
        role: 'customer',
        entryId: doc._id,
        route: 'pages_users_edit',
        action: action
    });
});
