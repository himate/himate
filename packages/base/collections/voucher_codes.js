VoucherCodesSchema = new SimpleSchema({
    reserved: {
        type: Date,
        index: 1,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
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
    voucherId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1
    },
    code: {
        type: String,
        index: 1
    }
});

VoucherCodes = new Mongo.Collection('voucher_codes');
VoucherCodes.attachSchema(VoucherCodesSchema);
