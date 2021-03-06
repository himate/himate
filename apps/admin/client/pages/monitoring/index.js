// ----- private helpers -------------------------------------------------------
/**
 *
 */
var observer = null;

/**
 * @param {Array} reports
 */
var updateCharts = function() {

    if ($('#chart-1').length) {

        var labels = [];
        var userValues = [];
        var cpuValues = [];
        var memoryValues = [];
        var totalMemoryValue;

        var reports = HiMate.Collections.Reports.find({}, {
            sort: {
                created: 1
            }
        }).forEach(function(elem, idx) {
            labels.push(moment(elem.created).format('HH:mm'));
            userValues.push(elem.activeUsers);
            cpuValues.push(elem.cpuLoad);
            memoryValues.push(elem.memory.total - elem.memory.free);
            totalMemoryValue = elem.memory.total;
        });

        // active users
        var ctx = document.getElementById("chart-1").getContext("2d");
        var data = {
            labels: labels,
            datasets: [{
                label: "Active Users",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: userValues
            }]
        };
        new Chart(ctx).Line(data, {
            responsive: true,
            animation: false,
            scaleBeginAtZero: true,
            showTooltips: false,
            tooltipFontSize: 10,
            tooltipYPadding: 4,
            tooltipXPadding: 4,
            tooltipCaretSize: 4,
            tooltipCornerRadius: 4
        });

        // cpu load
        var ctx = document.getElementById("chart-2").getContext("2d");
        var data = {
            labels: labels,
            datasets: [{
                label: "CPU Load",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: cpuValues
            }]
        };
        new Chart(ctx).Line(data, {
            responsive: true,
            animation: false,
            showTooltips: false,
            tooltipFontSize: 10,
            tooltipYPadding: 4,
            tooltipXPadding: 4,
            tooltipCaretSize: 4,
            tooltipCornerRadius: 4,
            tooltipTemplate: "<%= value %> %",
            scaleBeginAtZero: true,
            scaleOverride: true,
            scaleStepWidth: 20,
            scaleSteps: 5,
            scaleStartValue: 0,
            scaleLabel: function(param) {
                return param.value + "%";
            }
        });

        // memory usage
        var ctx = document.getElementById("chart-3").getContext("2d");
        var data = {
            labels: labels,
            datasets: [{
                label: "Memory Usage",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: memoryValues
            }]
        };
        new Chart(ctx).Line(data, {
            responsive: true,
            animation: false,
            showTooltips: false,
            tooltipFontSize: 10,
            tooltipYPadding: 4,
            tooltipXPadding: 4,
            tooltipCaretSize: 4,
            tooltipCornerRadius: 4,
            tooltipTemplate: "<%= HiMate.Helpers.sizify(value) %>",
            scaleBeginAtZero: true,
            scaleOverride: true,
            scaleStepWidth: totalMemoryValue / 5,
            scaleSteps: 5,
            scaleStartValue: 0,
            scaleLabel: function(payload) {
                return (payload.value / totalMemoryValue * 100) + "%";
            }
        });
    }
};

// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_monitoring.helpers({

    /**
     *
     */
    activities: function() {
        var filter = {};
        if (Session.get('query')) {
            filter["$or"] = [];
            filter["$or"].push({
                'username': new RegExp(Session.get('query'), "gi")
            });
            filter["$or"].push({
                'entryId': new RegExp(Session.get('query'), "gi")
            });
            filter["$or"].push({
                'action': new RegExp(Session.get('query'), "gi")
            });
            filter["$or"].push({
                'code': new RegExp(Session.get('query'), "gi")
            });
        }

        return HiMate.Collections.Activities.find(filter, {
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
        return HiMate.Collections.Entries.findOne(id);
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
                HiMate.Helpers.errorMessage(err.error);
                return;
            }
            HiMate.Helpers.infoMessage(response);
        });
        return HiMate.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_monitoring.onRendered(function() {
    updateCharts();
    Meteor.setTimeout(function() {
        observer = HiMate.Collections.Reports.find().observe({
            added: updateCharts,
            changed: updateCharts,
            removed: updateCharts
        });
    }, 1000);
});

/**
 *
 */
Template.pages_monitoring.onDestroyed(function() {
    observer.stop();
    observer = null;
});
