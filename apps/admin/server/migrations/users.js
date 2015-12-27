/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // fix usernames: we use the first email address as username
    // :TODO: remove before launch, this only fixes old dbs
    Meteor.users.find().forEach(function(u) {
        if (u.emails && u.emails[0] && u.username != u.emails[0].address) {
            Meteor.users.update(u._id, {
                $set: {
                    username: u.emails[0].address
                }
            });
        }
    });
});
