/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // empty database?
    if (Categories.find().count() === 0 && Vouchers.find().count() === 0) {

        // so add some demo content
        console.log("> empty database");
        console.log("> add some demo content...");

        // "Fashion" coupons
        var c = Categories.insert({
            "title": "Fashion"
        });

        Vouchers.insert({
            "title": "Fashion 1",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Fashion 2",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Fashion 3",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Fashion 4",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Categories.update(c, {
            $set: {
                voucherCount: Vouchers.find({
                    categoryId: c
                }).count()
            }
        });

        // "DIY" coupons
        c = Categories.insert({
            "title": "DIY"
        });

        Vouchers.insert({
            "title": "DIY 1",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "DIY 2",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "DIY 3",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Categories.update(c, {
            $set: {
                voucherCount: Vouchers.find({
                    categoryId: c
                }).count()
            }
        });

        // "Food" coupons
        c = Categories.insert({
            "title": "Food"
        });

        Vouchers.insert({
            "title": "Food 1",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Food 2",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Food 3",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Food 4",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Food 5",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Food 6",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Categories.update(c, {
            $set: {
                voucherCount: Vouchers.find({
                    categoryId: c
                }).count()
            }
        });

        // "Furniture" coupons
        c = Categories.insert({
            "title": "Furniture"
        });

        Vouchers.insert({
            "title": "Furniture 1",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Furniture 2",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Categories.update(c, {
            $set: {
                voucherCount: Vouchers.find({
                    categoryId: c
                }).count()
            }
        });

        // "Household" coupons
        c = Categories.insert({
            "title": "Household"
        });

        Vouchers.insert({
            "title": "Household 1",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Vouchers.insert({
            "title": "Household 2",
            "description": "Lorem Ipsum",
            "categoryId": c
        });

        Categories.update(c, {
            $set: {
                voucherCount: Vouchers.find({
                    categoryId: c
                }).count()
            }
        });

        //
        console.log("> done.");
    }
});
