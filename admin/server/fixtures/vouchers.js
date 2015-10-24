/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // empty database?
    if (!Vouchers.find().count()) {

        var c = Categories.findOne({title: "Fashion"});
        var u = Meteor.users.findOne({"username": "merchant"});

        var v = Vouchers.insert({
            "title": "test",
            "categoryId": c._id,
            "userId": u._id,
            "created": new Date(),
            "published": new Date(),
            "description": "just a short description",
            "quantity": 1
        });
    }
});
