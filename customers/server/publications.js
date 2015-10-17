/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {
    return Vouchers.find();
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    return Categories.find();
}); 