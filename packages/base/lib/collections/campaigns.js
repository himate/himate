HiMate.Schemas.Campaign = new SimpleSchema({
    created: {
        type: Date,
        label: HiMate.Helpers.i18nLabel("created"),
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
        label: HiMate.Helpers.i18nLabel("user"),
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
        label: HiMate.Helpers.i18nLabel("category"),
        index: 1,
        autoform: {
            options: function() {
                var options = [];
                HiMate.Collections.Categories.find({}, {
                    fields: {
                        title: 1,
                        _id: 1
                    },
                    sort: {
                        title: 1
                    }
                }).fetch().forEach(function(element) {
                    options.push({
                        label: element.title[TAPi18n.getLanguage()],
                        value: element._id
                    });
                });
                return options;
            }
        }
    },
    title: {
        type: HiMate.Schemas.TranslationSchema,
        label: HiMate.Helpers.i18nLabel("title")
    },
    description: {
        type: HiMate.Schemas.TranslationSchemaOptionalTextarea,
        label: HiMate.Helpers.i18nLabel("description"),
        optional: true
    },
    conditions: {
        type: HiMate.Schemas.TranslationSchemaOptionalTextarea,
        label: HiMate.Helpers.i18nLabel("conditions"),
        optional: true
    },
    shortDescription: {
        type: HiMate.Schemas.TranslationSchemaTextarea,
        label: HiMate.Helpers.i18nLabel("short_description")
    },
    published: {
        type: Date,
        label: HiMate.Helpers.i18nLabel("published"),
        autoform: {
            defaultValue: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        }
    },
    end: {
        type: Date,
        label: HiMate.Helpers.i18nLabel("end"),
        optional: true
    },
    quantity: {
        type: Number,
        min: 1,
        label: HiMate.Helpers.i18nLabel("quantity"),
        autoform: {
            defaultValue: 1
        }
    },
    street: {
        type: String,
        label: HiMate.Helpers.i18nLabel("street")
    },
    number: {
        type: String,
        label: HiMate.Helpers.i18nLabel("number")
    },
    zipcode: {
        type: String,
        label: HiMate.Helpers.i18nLabel("zipcode")
    },
    city: {
        type: String,
        label: HiMate.Helpers.i18nLabel("city")
    },
    country: {
        type: String,
        label: HiMate.Helpers.i18nLabel("country")
    },
    // image
    imageId: {
        type: String,
        label: HiMate.Helpers.i18nLabel("images_add"),
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                accept: 'image/*',
                collection: 'waslchiraa_images',
                uploadProgressTemplate: 'pages_campaigns_form_fields_upload_progress',
                previewTemplate: 'pages_campaigns_form_fields_image_preview',
                label: HiMate.Helpers.i18nLabel("choose_image")
            }
        }
    }
});

// create collection and register schema
HiMate.Collections.Campaigns = new Mongo.Collection("waslchiraa_campaigns");
HiMate.Collections.Campaigns.attachSchema(HiMate.Schemas.Campaign);
