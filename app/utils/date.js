define([
    'jquery'
], function ($) {
    "use strict";

    var DateUtil = function(options) {
        this.defaults = {
            weekStartOnMonday: false
        };

        this.params = $.extend({}, this.defaults, options)
    };

    DateUtil.prototype.timeToDays = function(time) {
        return time/1000/60/60/24;
    };

    DateUtil.prototype.getWeekNumber = function(date) {
        var sundayDayNumber = this.weekStartOnMonday ? 7 : 0;
        var weekNumber;
        var yearStart;
        var ts;

        if (_.isDate(date)) {
            ts = new Date(date);
        } else {
            ts = date ? new Date(date) : new Date();
        }

        yearStart = new Date(ts.getFullYear(), 0, 1);

        ts.setHours(0, 0, 0);
        ts.setDate(ts.getDate() + 3 - (ts.getDay() || sundayDayNumber));

        weekNumber = Math.floor((this.timeToDays(ts - yearStart) + 1) / 7);

        return weekNumber;
    };

    DateUtil.prototype.monthLastDay = function(year, month) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (this.isLeap(year)) {
            days[1] = 29;
        }

        return days[month];
    };

    DateUtil.prototype.isLeap = function(year) {
        if (year % 4 !== 0) {
            return false;
        }
        return (year % 100 === 0) && (year % 400 === 0);
    };

    DateUtil.prototype.getNextMonth = function(month) {
        return (month === 11) ? 0 : month + 1;
    };

    DateUtil.prototype.getPrevMonth = function(month) {
        return (month === 0) ? 11 : month - 1;
    };

    return DateUtil;
});
