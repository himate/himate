Template.layout.rendered = function() {

    // putting the tabs bar in the bottom of the view on android platform
    var $tabsbar = this.$('.js-tabs-bar');
    if ( $tabsbar.hasClass('tabs-top')) {
        $tabsbar.removeClass('tabs-top tabs-striped tabs-icon-left');
    }

};