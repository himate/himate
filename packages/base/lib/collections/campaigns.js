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
    approved: {
        type: Boolean,
        defaultValue: false,
        optional: false

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
    companyName: {
        type: String,
        optional: true,
        label: HiMate.Helpers.i18nLabel("company_name")
    },
    webAddress: {
        type: String,
        optional: true,
        label: HiMate.Helpers.i18nLabel("web_address")
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
    },
    // cache values
    available: {
        type: Number,
        defaultValue: 0,
        optional: true
    },
    reserved: {
        type: Number,
        defaultValue: 0,
        optional: true
    },
    redeemed: {
        type: Number,
        defaultValue: 0,
        optional: true
    }
});

// create collection and register schema
HiMate.Collections.Campaigns = new Mongo.Collection("waslchiraa_campaigns");
HiMate.Collections.Campaigns.attachSchema(HiMate.Schemas.Campaign);

// ----- public methods --------------------------------------------------------
/**
 * @param {Number} campaignId
 */
// also Updates the Campaign Collection
HiMate.Collections.Campaigns.countVouchers = function(campaignId) {
    var campaign = HiMate.Collections.Campaigns.findOne({
        _id: campaignId
    });
    var now = new Date();

    if (campaign) {
        var reserved = HiMate.Collections.Vouchers.find({
            'campaignId': campaignId,
            'redeemed': null
        }).count();

        var redeemed = HiMate.Collections.Vouchers.find({
            'campaignId': campaignId,
            'redeemed': {
                $lt: now
            }
        }).count();

        HiMate.Collections.Campaigns.update(campaignId, {
            $set: {
                reserved: reserved,
                redeemed: redeemed,
                available: campaign.quantity - (redeemed + reserved)
            }
        });
    }
};

//sets back the campaign reserved and available count after user cancels a reervation
HiMate.Collections.Campaigns.updateCampaignCount = function(campaignId) {
    var campaign = HiMate.Collections.Campaigns.findOne({
        _id: campaignId
    });
    var now = new Date();

    if (campaign) {
        HiMate.Collections.Campaigns.update(campaignId, {
            $set: {
                reserved: campaign.reserved - 1,
                available: campaign.available + 1
            }
        });
    }
};
