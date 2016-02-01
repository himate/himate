HiMate.Schemas.Voucher = new SimpleSchema({
    reserved: {
        type: Date,
        index: 1,
        label: HiMate.Helpers.i18nLabel("reserved"),
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    redeemed: {
        type: Date,
        label: HiMate.Helpers.i18nLabel("redeemed"),
        optional: true,
        index: 1
    },
    userId: {
        type: String,
        label: HiMate.Helpers.i18nLabel("user"),
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    campaignId: {
        type: String,
        label: HiMate.Helpers.i18nLabel("campaign"),
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    code: {
        type: String,
        label: HiMate.Helpers.i18nLabel("code"),
        index: 1
    }
});

HiMate.Collections.Vouchers = new Mongo.Collection('waslchiraa_vouchers');
HiMate.Collections.Vouchers.attachSchema(HiMate.Schemas.Voucher);
