// Schema definition for Vouchers
VoucherSchema = new SimpleSchema({
    created: {
        type: Date,
        label: "Created",
        autoValue: function() {
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
    title: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    published: {
        type: Date,
        optional: true
    }
});

// create collection and attach schema, so we can validate user input
Vouchers = new Mongo.Collection("vouchers");
Vouchers.attachSchema(VoucherSchema);
