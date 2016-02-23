/**
 *
 */
Template.himate_partials_messages.helpers({

    /**
     *
     */
    messages: function() {
        return HiMate.Collections.Messages.find();
    }
});

/**
 *
 */
Template.himate_partials_messages_item.onRendered(function() {
    var msg = this.data;
    Meteor.setTimeout(function() {
        HiMate.Collections.Messages.remove(msg._id);
    }, 3000);
});
