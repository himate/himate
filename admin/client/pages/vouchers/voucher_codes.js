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
      console.log("Router.current().params._id", Router.current().params._id);
      console.log("VoucherCodes.find()", VoucherCodes.find().fetch());
        return VoucherCodes.find();
    },

});

Template.pages_voucher_codes_code.helpers({
    user: function(){
        return Meteor.users.findOne(this.userId).username;
    }
});