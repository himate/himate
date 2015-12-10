Template.pages_startpage.events({


    /**
     *
     */
    'click .locale-change': function(event, template) {
        Waslchiraa.Helpers.setLanguage(this.tag);
        return Waslchiraa.Helpers.cancel(event);
    }
});
// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#pages-startpage .dropdown').dropdown();
});
