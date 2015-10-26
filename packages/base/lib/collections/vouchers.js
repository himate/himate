TranslationSchemaOptional = new SimpleSchema({
    de: {
        type: String,
        optional: true,
    },
    en: {
        type: String,
        optional: true,
    },
    ar: {
        type: String,
        optional: true,
    },

});
TranslationSchema = new SimpleSchema({
    de: {
        type: String,
    },
    en: {
        type: String,
    },
    ar: {
        type: String,
    },

});

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
            index: 1,
            autoform: {
                options: function () {
                    var options = [];
                    Meteor.users.find({
                        roles: {
                            $in: ['merchant']
                        }
                    }, {
                        fields: {
                            username: 1,
                            _id: 1
                        },
                        sort: {
                            username: 1
                        }
                    }).forEach(function (element) {
                        options.push({
                            label: element.username,
                            value: element._id
                        });
                    });
                    return options;
                }
            }
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
                    return options;
                }
            }
        },
        title: {
            type: TranslationSchema,
        },
        description: {
            type: TranslationSchemaOptional,
        },
        conditions: {
            type: TranslationSchemaOptional,
        },
        shortDescription: {
            type: TranslationSchema,
        },
        published: {
            type: Date,
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
        },
        street: {
            type: String
        },
        number: {
            type: String
        },
        zipcode: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    }
);

Vouchers = new Mongo.Collection("vouchers");
Vouchers.attachSchema(VoucherSchema);

