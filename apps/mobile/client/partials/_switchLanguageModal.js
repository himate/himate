Template._switchLanguage.events({
    'click .js-lang-change': function(event, template) {
        HiMate.Helpers.setLanguage(this.id);
        IonModal.close();
        return HiMate.Helpers.cancel(event);
    }
});


Template._switchLanguage.helpers({
    languageIs: function (language) {
        return language === "fr";
    }
});