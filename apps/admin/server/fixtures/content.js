/**
 * wait until meteor is ready
 */

Meteor.startup = function (callback) {
    if (__meteor_bootstrap__.startupHooks) {
        __meteor_bootstrap__.startupHooks.push(callback);
    } else {
        // We already started up. Just call it now.
        callback();
    }
};

Meteor.startup(function() {

    // empty database?
    if (HiMate.Collections.Categories.find().count() === 0 && HiMate.Collections.Campaigns.find().count() === 0) {

        // so add some demo content
        console.log("> empty database");
        console.log("> add some demo categories...");

        // "Fashion" coupons
        var c = HiMate.Collections.Categories.insert({
            "title": "Fashion"
        });

        // "DIY" coupons
        c = HiMate.Collections.Categories.insert({
            "title": "DIY"
        });

        // "Food" coupons
        c = HiMate.Collections.Categories.insert({
            "title": "Food"
        });

        // "Furniture" coupons
        c = HiMate.Collections.Categories.insert({
            "title": "Furniture"
        });

        // "Household" coupons
        c = HiMate.Collections.Categories.insert({
            "title": "Household"
        });


        //
        console.log("> done.");
    }

});
