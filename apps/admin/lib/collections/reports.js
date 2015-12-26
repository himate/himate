Waslchiraa.Schemas.Report = new SimpleSchema({
    created: {
        type: Date,
        label: Waslchiraa.Helpers.i18nLabel("created"),
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            }
            else {
                this.unset();
            }
        }
    },
    // general stats
    activeUsers: {
        type: Number,
        defaultValue: 0
    },
    cpuLoad: {
        type: Number,
        defaultValue: 0
    },
    memoryUsed: {
        type: Number,
        defaultValue: 0
    },
    // summaries of user data,
    vouchers: {
        type: Object,
        blackbox: true
    },
    campaigns: {
        type: Object,
        blackbox: true
    }
});

// create collection and register schema
Waslchiraa.Collections.Reports = new Mongo.Collection("waslchiraa_reports");
Waslchiraa.Collections.Reports.attachSchema(Waslchiraa.Schemas.Report);

// ----- public methods --------------------------------------------------------
Waslchiraa.Collections.Reports.collectData = function() {
    //console.log('Waslchiraa.Collections.Reports.collectData()', this);

    // collect data
    var report = {};
    report.activeUsers = Meteor.users.find({
        'status.online': true
    }).count();

    report.vouchers = {};
    report.campaigns = {};
    //console.log(report);

    Waslchiraa.Collections.Reports.insert(report);

    // remove old entries
    var now = new Date();
    var toOld = new Date();
    toOld.setDate(now.getDate());
    toOld.setHours(0);
    toOld.setMinutes(now.getMinutes() - 20);
    toOld.setSeconds(0);
    Waslchiraa.Collections.Reports.remove({
        created: {
            $lt: toOld
        }
    });

    // restart in 60 seconds
    Meteor.setTimeout(function() {
        Waslchiraa.Collections.Reports.collectData();
    }, 60 * 1000);
};
