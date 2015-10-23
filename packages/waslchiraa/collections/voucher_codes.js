VoucherCodes = new Mongo.Collection('voucher_codes');

VoucherCodesSchema = new SimpleSchema({
    reserved: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    redeemed: {
        type: Date,
        optional: true,
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
//        index: 1
    },
    voucherId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
//        index: 1
    },
    code: {
        type: String,
//        index: 1
    }
});

VoucherCodes.attachSchema(VoucherCodesSchema);
