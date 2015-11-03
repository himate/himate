// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_sub_menu.events({

    /**
     * get input value after each keypress, so we can build a realtime search
     * in our pages.
     *
     * @param {Object} event
     */
    'keyup input': function(event) {
        Session.set('query', $(event.currentTarget).val());
    }
});

// ----- template hooks --------------------------------------------------------
/**
 * reset input field/search data on each template refresh (this is always a
 * route change, so our last query is invalid)
 */
Template.partials_sub_menu.onRendered(function() {
    Session.set('query', '');
    $('#partials-sub-menu input:eq(0)').val('');
});
