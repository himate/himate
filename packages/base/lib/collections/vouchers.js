Waslchiraa.Schemas.Voucher = new SimpleSchema({
    reserved: {
        type: Date,
        index: 1,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    redeemed: {
        type: Date,
        optional: true,
        index: 1
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    campaignId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    code: {
        type: String,
        index: 1
    }
});

Waslchiraa.Collections.Vouchers = new Mongo.Collection('waslchiraa_vouchers');
Waslchiraa.Collections.Vouchers.attachSchema(Waslchiraa.Schemas.Voucher);
