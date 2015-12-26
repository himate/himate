Meteor.startup(function() {
    // start monitoring ...
    Waslchiraa.Collections.Reports.collectData();
});
