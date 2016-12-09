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
            "title": {
                en:"Fashion",
                de: "Mode",
                ar:" موضة ",
                fr: "Mode"
            }
        });

        // "DIY" coupons
        c = HiMate.Collections.Categories.insert({
            "title": {
                en:"DIY",
                de: "DIY",
                ar:"افعلها بنفسك",
                fr: "Bricolage"
            }
        });

        // "Food" coupons
        c = HiMate.Collections.Categories.insert({
            "title": {
                en:"Food",
                de: "Lebensmittel",
                ar:"طعام",
                fr: "Aliments"
            }
        });

        // "Furniture" coupons
        c = HiMate.Collections.Categories.insert({
            "title":{
                en:"Furniture",
                de: "Möbel",
                ar:"أثاث",
                fr: "Meubles"
            }
        });

        // "Household" coupons
        c = HiMate.Collections.Categories.insert({
            "title": {
                en:"Household",
                de: "Möbel",
                ar:" المنزلية ",
                fr: "Ménage"
            }
        });


        //
        console.log("> done.");
    }

});
