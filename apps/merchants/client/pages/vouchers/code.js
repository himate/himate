// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers_code.helpers({

    /**
     *
     */
    user: function() {
        return Meteor.users.findOne(this.userId);
    }
});
