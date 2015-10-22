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
    if (Categories.find().count() === 0 && Vouchers.find().count() === 0) {

        // so add some demo content
        console.log("> empty database");
        console.log("> add some demo categoriest...");

        // "Fashion" coupons
        var c = Categories.insert({
            "title": "Fashion"
        });

        // "DIY" coupons
        c = Categories.insert({
            "title": "DIY"
        });

        // "Food" coupons
        c = Categories.insert({
            "title": "Food"
        });

        // "Furniture" coupons
        c = Categories.insert({
            "title": "Furniture"
        });

        // "Household" coupons
        c = Categories.insert({
            "title": "Household"
        });

        //
        console.log("> done.");
    }

});
