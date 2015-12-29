/**
 * Activities
 */
Meteor.methods({

    /**
     * @param {Object} doc
     */
    "activities_remove": function(id) {

        // check user input
        check(id, String);

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        return HiMate.Collections.Activities.remove(id);
    }
});
