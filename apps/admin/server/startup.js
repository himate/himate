Meteor.startup(function() {
    // start monitoring ...
    HiMate.Collections.Reports.collectData();
});
