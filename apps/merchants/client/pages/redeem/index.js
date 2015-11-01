Template.pages_redeem.events({
    "submit .redeem-voucher": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var voucher = event.target.voucher.value;

      var result = Meteor.call('vouchers_redeem', voucher, function(err, data){
          if(err) {
              Waslchiraa.Helpers.errorMessage(err.message);
          }else{
              Waslchiraa.Helpers.infoMessage('voucher ' + voucher + ' has been redeemed');
          }
      });

      event.target.voucher.value = "";
    }
  });
