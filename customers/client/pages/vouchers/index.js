// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all vouchers
     * @reactive
     */
    vouchers: function() {
        var c = Session.get('category');

        Meteor.call('get_vouchers', c, function (error, data) {
            Session.set('vouchers', data);
        });

        return Session.get('vouchers');
    },

    /**
     *
     */
    category: function() {
        var c = Session.get('category');
        if (c) {
            return c;
        }
        return null;
    }
});

Template.pages_vouchers_voucher.helpers({

});


// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     * jump to categories page
     * @param {Object} event
     */
    'click .js-categories .js-category-item': function(event) {
        Router.go('pages_categories');
        return App.Helpers.cancel(event);
    },

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .js-categories .js-voucher': function(event) {
        Router.go('pages_vouchers_details', {
            _id: this._id
        });
        return App.Helpers.cancel(event);
    }

    /**
     * TODO:does it exist ?
     * user clicks on single/group filter
     * @param {Object} event
     */
    //'click .amount .item': function(event) {
    //    $('#pages-vouchers .amount .item').removeClass('active');
    //    $(event.currentTarget).addClass('active');
    //    Session.set('single', $(event.currentTarget).hasClass('single'));
    //    return App.Helpers.cancel(event);
    //}
});

Template.pages_vouchers_voucher.events({

});
