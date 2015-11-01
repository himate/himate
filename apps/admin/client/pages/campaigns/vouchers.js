// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({
    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        return Waslchiraa.Collections.Vouchers.find();
    },

});

Template.pages_vouchers_code.helpers({
    user: function(){
        return Meteor.users.findOne(this.userId).username;
    }
});