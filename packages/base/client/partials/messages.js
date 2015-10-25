/**
 *
 */
Template.waslchiraa_partials_messages.helpers({

    /**
     *
     */
    messages: function() {
        return Messages.find();
    }
});

/**
 *
 */
Template.waslchiraa_partials_messages_item.onRendered(function() {
    var msg = this.data;
    Meteor.setTimeout(function() {
        Messages.remove(msg._id);
    }, 3000);
});
