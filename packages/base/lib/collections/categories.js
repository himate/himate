HiMate.Schemas.Category = new SimpleSchema({
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
    title: {
        type: HiMate.Schemas.TranslationSchema,
        label: HiMate.Helpers.i18nLabel("title")
    }
});

HiMate.Collections.Categories = new Mongo.Collection("waslchiraa_categories");
HiMate.Collections.Categories.attachSchema(HiMate.Schemas.Category);
