/**
 * we don't want any update on user's profile using Meteor.users.update
 */
Meteor.startup(function() {
    Meteor.users.deny({
        update: function() {
            return true;
        }
    });
});
