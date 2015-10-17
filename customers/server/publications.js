/**
 * publish all coupons
 */
Meteor.publish('coupons', function() {
    return Coupons.find();
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    return Categories.find();
});