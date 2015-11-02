Waslchiraa.Schemas.Category = new SimpleSchema({
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
    title: {
        type: String
    }
});

Waslchiraa.Collections.Categories = new Mongo.Collection("waslchiraa_categories");
Waslchiraa.Collections.Categories.attachSchema(Waslchiraa.Schemas.Category);
