Template.pages_vouchers_voucher.helpers({

    voucherCodeCount: function (voucherId) {
        return VoucherCodes.find({
            voucherId: voucherId
        }).count();
    }

});