/**
 *
 */
Template.waslchiraa_partials_messages.helpers({

    /**
     *
     */
    messages: function() {
        return Waslchiraa.Collections.Messages.find();
    }
});

/**
 *
 */
Template.waslchiraa_partials_messages_item.onRendered(function() {
    var msg = this.data;
    Meteor.setTimeout(function() {
        Waslchiraa.Collections.Messages.remove(msg._id);
    }, 3000);
});
