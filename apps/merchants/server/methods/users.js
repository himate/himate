/**
 * Waslchiraa.Collections.Campaigns
 */
Meteor.methods({

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "users_edit": function (doc, id) {


        // voucher should be owned by the current user
        var user = Meteor.users.findOne(id);
        console.log(doc, id);
        if (!user) {
            throw new Meteor.Error("not-found");
        }

        if (user._id != Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        check(id, String);
        check(doc, Object);
        check(doc.$set, {
            'profile.company': String,
            'profile.salutation': String,
            'profile.firstName': String,
            'profile.lastName': String,
            'profile.street': String,
            'profile.number': String,
            'profile.zipcode': String,
            'profile.city': String,
            'profile.country': String,
            'profile.tel': Match.Optional(String),
        });

        // save update
        return Meteor.users.update(id, doc);
    }

});


