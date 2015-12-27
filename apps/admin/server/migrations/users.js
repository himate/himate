/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // fix usernames
    // we'll use the first email address as username, and
    Meteor.users.find({
        "username": ""
    }).forEach(function(elem) {
        Meteor.users.update(elem._id, {
            $set: {
                username: elem.emails[0].address
            }
        });
    });
});
