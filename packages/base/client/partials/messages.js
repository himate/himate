/**
 *
 */
Template.himate_partials_messages.helpers({

    /**
     *
     */
    messages: function() {
        var result = HiMate.Collections.Messages.find().fetch().map(function(item){
            return {
                type: item.type,
                message: TAPi18n.__(item.message),
            };
        });
        return result;
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
