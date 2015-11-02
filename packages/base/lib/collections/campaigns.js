var TranslationSchemaOptional = new SimpleSchema({
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

var TranslationSchemaOptionalTextarea = new SimpleSchema({
    de: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    en: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    ar: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },

});
var TranslationSchema = new SimpleSchema({
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
var TranslationSchemaTextarea = new SimpleSchema({
    de: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    en: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    ar: {
        type: String,
        autoform: {
            rows: 5
        }
    },

});

Waslchiraa.Schemas.Campaign = new SimpleSchema({
    created: {
        type: Date,
        label: Waslchiraa.Helpers.i18nLabel("created"),
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
        label: Waslchiraa.Helpers.i18nLabel("user"),
        optional: true,
        index: 1,
        autoform: {
            options: function() {
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
                }).forEach(function(element) {
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
        label: Waslchiraa.Helpers.i18nLabel("category"),
        index: 1,
        autoform: {
            options: function() {
                var options = [];
                Waslchiraa.Collections.Categories.find({}, {
                    fields: {
                        title: 1,
                        _id: 1
                    },
                    sort: {
                        title: 1
                    }
                }).fetch().forEach(function(element) {
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
        label: Waslchiraa.Helpers.i18nLabel("title")
    },
    description: {
        type: TranslationSchemaOptionalTextarea,
        label: Waslchiraa.Helpers.i18nLabel("description")
    },
    conditions: {
        type: TranslationSchemaOptionalTextarea,
        label: Waslchiraa.Helpers.i18nLabel("conditions")
    },
    shortDescription: {
        type: TranslationSchemaTextarea,
        label: Waslchiraa.Helpers.i18nLabel("short_description")
    },
    published: {
        type: Date,
        label: Waslchiraa.Helpers.i18nLabel("published"),
        autoform: {
            value: new Date()
        }
    },
    end: {
        type: Date,
        label: Waslchiraa.Helpers.i18nLabel("end"),
        optional: true
    },
    quantity: {
        type: Number,
        min: 1,
        label: Waslchiraa.Helpers.i18nLabel("quantity"),
        autoform: {
            value: 1
        }
    },
    street: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("street")
    },
    number: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("number")
    },
    zipcode: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("zipcode")
    },
    city: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("city")
    },
    country: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("country")
    }
});

// create collection and register schema
Waslchiraa.Collections.Campaigns = new Mongo.Collection("waslchiraa_campaigns");
Waslchiraa.Collections.Campaigns.attachSchema(Waslchiraa.Schemas.Campaign);
