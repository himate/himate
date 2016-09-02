
Meteor.publish('campaigns', function () {
    return HiMate.Publications.customers.campaigns.call(this);
});

Meteor.publish('categories', function (categoryIds) {
    return HiMate.Publications.customers.categories.call(this,categoryIds);
});


Meteor.publish('images', function (campaignIds) {

    return HiMate.Publications.customers.images.call(this.campaignIds);
});

Meteor.publish('vouchers', function (campaignIds) {
    return HiMate.Publications.customers.vouchers.call(this,campaignIds);

});
