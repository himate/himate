// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_voucher_codes.helpers({
    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        return VoucherCodes.find();
    },

});

Template.pages_voucher_codes_code.helpers({
    user: function(){
        console.log( Meteor.users.find().fetch());
        return Meteor.users.findOne(this.userId);
    }
});