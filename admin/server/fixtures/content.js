/**
 * wait until meteor is ready
 */
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
