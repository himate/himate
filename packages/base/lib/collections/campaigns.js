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
        type: Waslchiraa.Schemas.TranslationSchema,
        label: Waslchiraa.Helpers.i18nLabel("title")
    },
    description: {
        type: Waslchiraa.Schemas.TranslationSchemaOptionalTextarea,
        label: Waslchiraa.Helpers.i18nLabel("description"),
        optional: true
    },
    conditions: {
        type: Waslchiraa.Schemas.TranslationSchemaOptionalTextarea,
        label: Waslchiraa.Helpers.i18nLabel("conditions"),
        optional: true
    },
    shortDescription: {
        type: Waslchiraa.Schemas.TranslationSchemaTextarea,
        label: Waslchiraa.Helpers.i18nLabel("short_description")
    },
    published: {
        type: Date,
        label: Waslchiraa.Helpers.i18nLabel("published"),
        autoform: {
            defaultValue: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
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
            defaultValue: 1
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
    },
    // image
    imageId: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("images_add"),
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                accept: 'image/*',
                collection: 'waslchiraa_images',
                label: 'Choose file',
                onBeforeInsert: function() {
                    return function(fileObj) {
                        console.log(fileObj);
                    };
                },
                onAfterInsert: function() {
                    return function(err, fileObj) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        $('input[data-schema-key="imageId"]').val(fileObj._id);
                        console.log(fileObj);
                    };
                }
            }
        }
    }
});

// create collection and register schema
Waslchiraa.Collections.Campaigns = new Mongo.Collection("waslchiraa_campaigns");
Waslchiraa.Collections.Campaigns.attachSchema(Waslchiraa.Schemas.Campaign);
