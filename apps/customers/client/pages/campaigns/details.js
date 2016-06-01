// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_details.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    item: function () {
        var result = HiMate.Collections.Campaigns.findOne({
            _id: Router.current().params._id
        });
        return result;
    }
});

// ----- templat events --------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_details.events({

    /**
     * @param {Object} event
     * @param {Object} template
     */
    'click .js-reserve-voucher': function (event, template) {
        var $modalConfirmation = $('.modal.confirmation')
            .modal({
                closable: true,
                onDeny: function () {
                    $modalConfirmation.modal('hide');
                },
                onApprove: function () {
                    var campaign = HiMate.Collections.Campaigns.findOne(Router.current().params._id);
                    if (campaign) {
                        var vouchercode = Meteor.call('vouchers_reserve', campaign._id.toString(), function (err, data) {
                            if (err) {
                                HiMate.Helpers.errorMessage(err.message);
                            }else {
                                HiMate.Helpers.infoMessage('voucher ' + data + ' has been reserved');
                            }
                        });
                    }
                    $modalConfirmation.modal('hide');
                }
            });
        var $modalLogin = $('.modal.login')
            .modal({
                closable: true,
                onDeny: function () {
                    $modalLogin.modal('hide');
                    $('.ui.sidebar').sidebar('toggle');
                    $('.at-signup').trigger('click');
                },
                onApprove: function () {
                    $modalLogin.modal('hide');
                    $('.ui.sidebar').sidebar('toggle');
                    $('.at-signin').trigger('click');
                }
            });
        if (Meteor.user()) {
            $modalConfirmation.modal('show');
        } else {

            $modalLogin.modal('show');
        }
    },

    /**
     * @param {Object} event
     * @param {Object} template
     */
    'click .js-open-map': function(event, template) {
        event.preventDefault();
        var campaign = HiMate.Collections.Campaigns.findOne(Router.current().params._id);
        if (campaign) {
            var address = campaign.country + ', ' + campaign.city + ', ' + campaign.street + ' ' + campaign.number + ', ' + campaign.zipcode;
            HTTP.call(
                'GET',
                'http://maps.google.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
                {},
                function(error, result) {
                    if (error) {
                        return;
                    }
                    if (result.data &&
                        result.data.results[0] &&
                        result.data.results[0].geometry &&
                        result.data.results[0].geometry.location &&
                        result.data.results[0].geometry.location.lat &&
                        result.data.results[0].geometry.location.lng) {

                        var lat = result.data.results[0].geometry.location.lat;
                        var lng = result.data.results[0].geometry.location.lng;
                        window.open("http://maps.google.com/?q=" + lat + ',' + lng, '_system');
                    }
                }
            );
        }
    }
});


