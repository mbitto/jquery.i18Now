/**
 * jquery.i18Now
 *
 * Version:     1.4.0
 * Last Update: 2013/2/10
 * Manuel Bitto (manuel.bitto@gmail.com)
 *
 *
 * changes log:
 *
 * version 1.1.0 -> Added fallback date for custom date
 * version 1.1.1 -> Added control for null value as custom date input
 * version 1.2.0 -> Added customizable AM / PM strings in options (ampm)
 * version 1.2.1 -> Corrected AM/PM 12 hour logic as in http://goo.gl/IUVXP
 *                  Added form inputs support
 * version 1.2.2 -> Fixed English translation
 * version 1.2.3 -> Fixed Custom date bug
 * version 1.3.0 -> Added Custom date update (useful for time offset)
 * version 1.3.1 -> Performance improvements (now uses only one Date object declaration inside plugin)
 * version 1.4.0 -> Added locale-unaware time management
 *
 *
 * This plugin is intended to help formatting date and time according to the user preferences
 * or the most used format in a specific country.
 * Here there are some examples of formatted date and times for different country and languages:
 *
 *
 * English (United States):     Wednesday, May 23, 2012 9:00:00 AM
 * English (United Kingdom):    Wednesday, 23 May 2012 09:00:00
 * German (Germany):            Mittwoch, 23. Mai 2012 09:00:00
 * Italian (Italy):             mercoledì 23 maggio 2012 09:00:00
 * French (France):             mercredi 23 mai 2012 09:00:00
 * Spanish (Spain):             miércoles 23 de mayo de 2012 09:00:00
 * Hebrew (Israel):             יום רביעי, 23 במאי 2012 09:00:00
 * Japanese (Japan):            2012年5月23日水曜日9時00分00秒
 * Chinese (China):             2012年5月23日星期午9时00分00秒
 * Russian (Russia):            среда, 23 мая 2012 г. 9:00:00
 *
 * See here for more examples: http://demo.icu-project.org/icu-bin/locexp/locexp
 *
 *
 * We use the same format characters of PHP (see: http://php.net/manual/en/function.date.php)
 *
 * j 	Day of the month without leading zeros 	                                1 to 31
 * d 	Day of the month, 2 digits with leading zeros 	                        01 to 31
 * l 	A full textual representation of the day of the week 	                Sunday through Saturday
 * D 	A textual representation of a day, three letters 	                    Sun through Sat
 * F 	A full textual representation of a month, such as January or March 	    January through December
 * M 	A short textual representation of a month, three letters 	            Jan through Dec
 * n	Numeric representation of a month, without leading zeros	            1 through 12
 * m 	Numeric representation of a month, with leading zeros 	                01 through 12
 * Y 	A full numeric representation of a year, 4 digits 	                    Examples: 1999 or 2003
 * y 	A two digit representation of a year 	                                Examples: 99 or 03
 * a 	Lowercase Ante meridiem and Post meridiem 	                            am or pm
 * A 	Uppercase Ante meridiem and Post meridiem 	                            AM or PM
 * g 	12-hour format of an hour without leading zeros 	                    1 through 12
 * G 	24-hour format of an hour without leading zeros 	                    0 through 23
 * h 	12-hour format of an hour with leading zeros 	                        01 through 12
 * H 	24-hour format of an hour with leading zeros 	                        00 through 23
 * i 	Minutes with leading zeros 	                                            00 to 59
 * s 	Seconds, with leading zeros 	                                        00 through 59
 *
 *
 */
(function($) {

    var init = function(options) {

        var date = new Date();

        options = $.extend({
            // Names of weekdays and months (english - UK)
            D : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            l : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            M : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            F : ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'],
            // Format for AM / PM (english - USA)
            ampm : ['AM', 'PM'],
            // Format as the default language (english - UK)
            format : "%l, %d %F %Y %H:%i:%s"
        }, options);

        // Initialize all i18Now elements
        return this.each(function(i, el){
            var $el = $(el);
            $el.data('i18Now_options', options);
            $el.data('i18Now_date', date);
            $el.text(parseFormat(options, date, false));
            $el.val(parseFormat(options, date, false));
        });
    };

    var parseFormat = function(options, date, useUTC){
        var useUTC = useUTC === true ? 'UTC' : '';

        var day = date['get' + useUTC +  'Date'](),
            month = date['get' + useUTC +  'Month'](),
            hours24 = date['get' + useUTC +  'Hours'](),
            hours12 = date['get' + useUTC +  'Hours']() % 12,
            minutes = date['get' + useUTC +  'Minutes'](),
            seconds = date['get' + useUTC +  'Seconds'](),

            formatChars = options["format"].split("%"),
            substitute = '',
            parsedTimeString = formatChars[0];
        
        if (hours12 === 0) {
            hours12 = 12;
        }

        for(var i=1; i<formatChars.length; i++){
            var formatChar = formatChars[i].charAt(0);
            switch(formatChar){
                case 'D': case 'l': substitute = options[formatChar][date.getDay()]; break;
                case 'M': case 'F': substitute = options[formatChar][month]; break;
                case 'n': substitute = month + 1; break;
                case 'm': substitute = setTwoDigits(month + 1); break;
                case 'j': substitute = day; break;
                case 'd': substitute = setTwoDigits(day); break;
                case 'Y': substitute = date.getFullYear(); break;
                case 'y': substitute = date.getFullYear().toString().substring(2); break;
                case 'a': substitute = (hours24 < 12) ? options['ampm'][0].toLowerCase() :
                                                         options['ampm'][1].toLowerCase() ; break;
                case 'A': substitute = (hours24 < 12) ? options['ampm'][0] : options['ampm'][1] ; break;
                case 'g': substitute = hours12; break;
                case 'G': substitute = hours24; break;
                case 'h': substitute = setTwoDigits(hours12); break;
                case 'H': substitute = setTwoDigits(hours24); break;
                case 'i': substitute = setTwoDigits(minutes); break;
                case 's': substitute = setTwoDigits(seconds); break;
                default : substitute = '%'; substitute += formatChar;
            }
            parsedTimeString += formatChars[i].replace(formatChar, substitute);
        }
        return parsedTimeString;
    };

    var setTwoDigits = function(number){
        return (String(number).length === 1) ? '0' + number : number;
    };

    var publicMethods = {
        // Update date strings every n seconds
        update : function(every){
            every = every >= 1 ? parseInt(every) : 1;
            this.each(function(i, el){
                var $el = $(el);
                if(typeof $el.data('i18Now_interval') !== "undefined"){
                    clearInterval($el.data('i18Now_interval'));
                }
                var localeUnaware = $el.data('i18Now_locale_unaware') || false;
                var interval = setInterval(function(){
                    var date = $el.data('i18Now_date');
                    date.setSeconds(date.getSeconds() + 1);
                    $el.text(parseFormat($el.data('i18Now_options'), date, localeUnaware));
                    $el.val(parseFormat($el.data('i18Now_options'), date, localeUnaware));
                }, every * 1000);
                $el.data('i18Now_interval', interval);
            });
        },

        // Set a custom date. Param must be a Date object
        setCustomDate : function(dateObj, fallback){
            if(typeof fallback === "undefined"){
                fallback = 'Invalid Date';
            }
            if(dateObj.getTime() === 0 || isNaN(dateObj.getTime())){
                this.text(fallback);
                this.val(fallback);
            }
            else{
                var parsedFormat = parseFormat(this.data('i18Now_options'), dateObj, false);
                this.text(parsedFormat);
                this.val(parsedFormat);
                this.data('i18Now_date', dateObj);
            }
        },

        // Format a date object
        parseFormat: function(options, dateObj) {
            return parseFormat(options, dateObj);
        }

        /**
         * @param date accepts strings in RFC 2822 format ie:  "Fri, 08 Feb 2013 14:30:17 +0800" or
         *        "Fri, 08 Feb 2013 6:30:17 GMT". In this case any timezone passed will be ignored
         *
         * @param timezoneOffset accepts the time zone offset in this format: "+0200", "-0445", "+0000"
         *        This offset will be added to output date
         *
         */
        setLocaleUnawareDate : function(date, timezoneOffset){
            var dateOnly = date.substr(0, date.lastIndexOf(' ')),
                forcedUTCDate = new Date(dateOnly + ' GMT');

            if(typeof timezoneOffset !== "undefined"){
                var hours = +timezoneOffset.substring(1, 3),
                    minutes = +timezoneOffset.substring(3, 5),
                    multiplier = timezoneOffset.charAt(0) === '+' ? 1 : -1;

                forcedUTCDate.setUTCMinutes(forcedUTCDate.getUTCMinutes() + (minutes * multiplier));
                forcedUTCDate.setUTCHours(forcedUTCDate.getUTCHours() + (hours * multiplier));
            }

            var parsedFormat = parseFormat(this.data('i18Now_options'), forcedUTCDate, true);

            this.text(parsedFormat);
            this.val(parsedFormat);
            this.data('i18Now_date', forcedUTCDate);
            this.data('i18Now_locale_unaware', true);
        }
    };

    // Plug i18Now in
    $.fn.i18Now = function(method){

        // We have a method like $('.class').plugin("doThis");
        if (publicMethods[method]) {
            return publicMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        // We have the initialization of plugin
        else if (typeof method === 'object' || ! method) {
            return init.apply(this, arguments);
        }
        // We've done something wrong here
        else {
            $.error('Method ' +  method + ' does not exist in i18Now plugin');
            return null;
        }
    };
})(jQuery);
