CategorySchema = new SimpleSchema({
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
    title: {
        type: String
    }
});

Categories = new Mongo.Collection("categories");
Categories.attachSchema(CategorySchema);
