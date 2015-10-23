// Schema definition for Vouchers

Vouchers = new Mongo.Collection("vouchers");

VoucherSchema = new SimpleSchema({
    created: {
        type: Date,
        label: "Created",
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            }
            else {
                this.unset();
            }
        }
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
        index: 1
    },
    // voucher category
    categoryId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1,
        autoform: {
            options: function () {
                var options = [];
                Categories.find({}, {
                    fields: {
                        title: 1,
                        _id: 1
                    },
                    sort: {
                        title: 1
                    }
                }).fetch().forEach(function (element) {
                    options.push({
                        label: element.title,
                        value: element._id
                    });
                });
                console.log(options);
                return options;
            }
        }
    },
    title: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    published: {
        type: Date,
        min: new Date(),
        autoform: {
           value: new Date()
        }
    },
    end: {
        type: Date,
        optional: true
    },
    quantity: {
        type: Number,
        min: 1,
        autoform: {
           value: 1
        }
    }
});
Vouchers.attachSchema(VoucherSchema);
