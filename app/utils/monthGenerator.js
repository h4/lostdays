"use strict";

define([
    'jquery',
    'underscore'
], function ($, _) {
    function timeToDays(time) {
        return time/1000/60/60/24;
    }

    function getWeekNumber(date, startOnMonday) {
        startOnMonday = startOnMonday ? 1 : 0;
        var weekNumber;
        var yearStart;
        var ts;

        if (_.isDate(date)) {
            ts = new Date(date);
        } else {
            ts = date ? new Date(date) : new Date();
        }

        ts.setHours(0, 0, 0);
        ts.setDate(ts.getDate() + 4 - (ts.getDay()||(startOnMonday && 7)));

        yearStart = new Date(ts.getFullYear(), 0, 1);

        weekNumber = Math.floor((timeToDays(ts - yearStart) + 1) / 7);

        return weekNumber;
    }

    function monthLastDay(year, month) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (isLeap(year)) {
            days[1] = 29;
        }

        return days[month];
    }

    function isLeap(year) {
        if (year % 4 !== 0) {
            return false;
        }
        return (year % 100 === 0) && (year % 400 === 0);
    }

    function MonthGenerator() {
        this.monthsCache = {};
    }

    MonthGenerator.prototype._generateDaysArray = function(year, month) {
        var i;
        var lastDayDate;
        var lastDay;
        var weeks;
        var daysArray = [];
        var firstDayDate;
        var firstDayWeekDay;

        if (this.monthsCache[year + '' + month]) {
            return this.monthsCache[year + '' + month];
        }

        firstDayDate = new Date(year, month, 1);
        firstDayWeekDay = firstDayDate.getDay();

        lastDay = monthLastDay(year, month);
        lastDayDate = new Date(year, month, lastDay);

        weeks = getWeekNumber(lastDayDate) - getWeekNumber(firstDayDate) + 1;

        for (i=0; i < weeks; i++) {
            daysArray[i] = [];
        }

        for (i=0; i < lastDay; i++) {
            daysArray[Math.floor((i + firstDayWeekDay) / 7)][(i + firstDayWeekDay) % 7] = i+1;
        }

        daysArray[weeks-1].length = 7;

        this.monthsCache[year + '' + month] = daysArray;

        return daysArray;
    };

    MonthGenerator.prototype._getMonthObjects = function(year, month, isCurrent) {
        var today = (new Date()).getDate();
        var monthArr = this._generateDaysArray(year, month);

        return _.map(monthArr, function(week) {
            return _.map(week, function(day) {
                return {
                    day: day,
                    date: day + "-" + month + "-" + year,
                    today: day === today,
                    monthIsCurrent: isCurrent
                }
            });
        });
    };

    MonthGenerator.prototype.getMonth = function(year, month, withSiblings) {
        var result;
        var prevMonth;
        var nextMonth;
        var prevMonthLastWeek;

        if (_.isDate(year)) {
            withSiblings = month;
            year = year.getFullYear();
            month = year.getMonth();
        }

        result = this._getMonthObjects(year, month, true);

        if (withSiblings) {
            prevMonth = this._getMonthObjects(year, month-1, false);
            nextMonth = this._getMonthObjects(year, month+1, false);
            prevMonthLastWeek = prevMonth[prevMonth.length-1];

            _.forEach(result[0], function(day, index, arr) {
                if (!day.day) {
                    arr[index] = prevMonthLastWeek[index];
                }
            });

            _.forEach(result[result.length-1], function(day, index, arr) {
                if (!day.day) {
                    arr[index] = nextMonth[0][index];
                }
            });
        }

        return result;
    };

    return new MonthGenerator();
});