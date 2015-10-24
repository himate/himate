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
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            quantity: 1,
            street: 'Street',
            number: '123',
            zipcode: '12345',
            city: 'City',
            country: 'Country'
        });
    }
});
