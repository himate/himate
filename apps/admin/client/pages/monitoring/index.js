// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_monitoring.helpers({

    /**
     *
     */
    activities: function() {
        return Waslchiraa.Collections.Activities.find({}, {
            sort: {
                created: -1
            }
        });
    },

    /**
     *
     */
    getEntry: function(id) {
        // :TODO: we need to distinguish the collections, extend Activities model!
        return Waslchiraa.Collections.Entries.findOne(id);
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_monitoring.events({

    /**
     *
     */
    'click .remove': function(event) {
        Meteor.call('activities_remove', this._id, function(err, response) {
            if (err) {
                Waslchiraa.Helpers.errorMessage(err.error);
                return;
            }
            Waslchiraa.Helpers.infoMessage(response);
        });
        return Waslchiraa.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_monitoring.onRendered(function() {

    Meteor.defer(function() {

        /**
         * first chart
         */
        var ctx = document.getElementById("chart-1").getContext("2d");
        var data = {
            labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            datasets: [{
                label: "Concurrent Users",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }, {
                label: "Connections",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        };
        var myLineChart = new Chart(ctx).Line(data, {
            responsive: true
        });

        // chart 2
        ctx = document.getElementById("chart-2").getContext("2d");
        data = {
            labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            datasets: [{
                label: "Load",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 58, 86, 78, 90]
            }]
        };
        myLineChart = new Chart(ctx).Line(data, {
            responsive: true
        });

        // chart 3
        ctx = document.getElementById("chart-3").getContext("2d");
        data = {
            labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            datasets: [{
                label: "Memory",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [38, 48, 52, 58, 86, 90, 90]
            }]
        };
        myLineChart = new Chart(ctx).Line(data, {
            responsive: true
        });
    });
});
