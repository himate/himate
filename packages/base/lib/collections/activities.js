Waslchiraa.Schemas.Activity = new SimpleSchema({
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
    username: {
        type: String,
        index: 1
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    role: {
        type: String,
        index: 1
    },
    entryId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
        index: 1
    },
    route: {
        type: String,
        optional: true,
        index: 1
    },
    action: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel("action"),
    }
});

// create collection and register schema
Waslchiraa.Collections.Activities = new Mongo.Collection("waslchiraa_activities");
Waslchiraa.Collections.Activities.attachSchema(Waslchiraa.Schemas.Activity);
