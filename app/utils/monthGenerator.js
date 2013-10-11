"use strict";

define([
    'jquery',
    'underscore'
], function ($, _) {
    function timeToDays(time) {
        return time/1000/60/60/24;
    }

    function getWeekNumber(date) {
        var weekNumber;
        var yearStart;
        var ts;

        if (_.isDate(date)) {
            ts = new Date(date);
        } else {
            ts = date ? new Date(date) : new Date();
        }

        ts.setHours(0, 0, 0);
        ts.setDate(ts.getDate() + 4 - (ts.getDay()||7));

        yearStart = new Date(ts.getFullYear(), 0, 1);

        weekNumber = Math.floor((timeToDays(ts - yearStart) + 1) / 7);

        return weekNumber;
    }

    function monthLastDay(month) {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    function MonthGenerator() {
        this.monthsCache = {};
    }

    MonthGenerator.prototype.getMonth = function(year, month) {
        var i;
        var date;
        var lastDayDate;
        var lastDay;
        var weeks;
        var days = [];
        var firstDayDay;

        if (_.isDate(year)) {
            date = year;
        } else {
            date = new Date(year, month, 1);
        }

        if (this.monthsCache[year + '' + month]) {
            return this.monthsCache[year + '' + month];
        }

        year = date.getFullYear();
        month = date.getMonth();
        lastDay = monthLastDay(month);
        firstDayDay = date.getDay();

        lastDayDate = new Date(year, month, lastDay);

        weeks = getWeekNumber(lastDayDate) - getWeekNumber(date) + 1;

        for (i=0; i < weeks; i++) {
            days[i] = [];
        }

        for (i=0; i < lastDay; i++) {
            days[Math.floor((i + firstDayDay) / 7)][(i + firstDayDay) % 7] = i+1;
        }

        days[weeks-1].length = 7;

        this.monthsCache[year + '' + month] = days;

        return days;
    };

    return new MonthGenerator();
});