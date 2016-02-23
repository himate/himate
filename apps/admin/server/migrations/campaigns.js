/**
 * wait until meteor is ready
 */
Meteor.startup(function() {
    HiMate.Collections.Campaigns.find().forEach(function(c) {
        HiMate.Collections.Campaigns.countVouchers(c._id);
    });
});
