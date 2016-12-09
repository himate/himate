// ----- template hooks ------------------------------------------------------
/*
 * Initializes pagination and registers observer to watch changes
 */
Template.pagination.onCreated(function() {
    var cursor = Template.currentData().cursor;

    var numberOfElements = 0;
    var pageSize = parseInt($('#pageSize').val()) || 10;

    Session.set('pagination_number_of_elements', numberOfElements);
    Session.set('pagination_page_size', pageSize);
    Session.set('pagination_page', 0);

    this.handler = cursor.observeChanges({
        added: function() {
            numberOfElements++;
            Session.set('pagination_number_of_elements', numberOfElements);
        },
        removed: function() {
            numberOfElements--;
            Session.set('pagination_number_of_elements', numberOfElements);
        }
    });
});

Template.pagination.onDestroyed(function() {
    if (this.handler) {
        this.handler.stop();
    }
});

// ----- template events -----------------------------------------------------
/*
 *
 */
Template.pagination.events({
    'click .page': function(event) {
        var pageNumber = $(event.currentTarget).attr('data-page-number');
        Session.set('pagination_page', pageNumber);
    },
    'change #pageSize': function(event) {
        var pageSize = parseInt(event.currentTarget.value);
        Session.set('pagination_page_size', pageSize);
    }
});

// ----- template helpers ----------------------------------------------------
/*
 *
 */
Template.pagination.helpers({
   pages: function() {
        var numberOfElements = Session.get('pagination_number_of_elements');
        var pageSize = Session.get('pagination_page_size');

        var numberOfPages = Math.ceil(numberOfElements / pageSize);

        var pages = [];

        for (var i = 0; i < numberOfPages; i++) {
           var page = '<a class="item page" data-page-number="' + i + '">' + (i + 1) + '</a>';
           pages.push(page);
        }

        return pages;
   }
});