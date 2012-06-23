/**
 * jquery.i18Now
 * Version:     1.1.1
 * Last Update: 2012/06/22
 * Manuel Bitto (manuel.bitto@gmail.com)
 *
 *
 * changes log:
 *
 * version 1.1.0 -> Added fallback date for custom date
 * version 1.1.1 -> Added control for null value as custom date input
 *
 * This plugin is intended to help formatting date and time according to the user preferences
 * or the most used format in a specific country.
 * Examples of formatted date and times for different country and languages are:
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
 * See here for more examples: http://www.localeplanet.com/icu/
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
        options = $.extend({
            // Names of weekdays and months (english - UK)
            D : ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
            l : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            M : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            F : ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'],
            // Format as the default language (english - UK)
            format : "%l, %d %F %Y %H:%i:%s"
        }, options);

        // Initialize all i18Now elements
        return this.each(function(i, el){
            var $el = $(el);
            $el.data('i18Now_options', options);
            $el.text(parseFormat(options, new Date()));
        });
    };

    var parseFormat = function(options, date){
        var day = date.getDate(),
            month = date.getMonth(),
            hours24 = date.getHours(),
            hours12 = date.getHours() % 12,
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            formatChars = options.format.split("%"),
            substitute = '',
            parsedTimeString = '';

        for(var i=0; i<formatChars.length; i++){
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
                case 'a': substitute = (hours24 <= 12) ? 'am' : 'pm' ; break;
                case 'A': substitute = (hours24 <= 12) ? 'AM' : 'PM' ; break;
                case 'g': substitute = hours12; break;
                case 'G': substitute = hours24; break;
                case 'h': substitute = setTwoDigits(hours12); break;
                case 'H': substitute = setTwoDigits(hours24); break;
                case 'i': substitute = setTwoDigits(minutes); break;
                case 's': substitute = setTwoDigits(seconds); break;
                default : if(i!==0) substitute = '%'; substitute += formatChar;
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
                if($el.data('i18Now_interval') !== 'undefined'){
                    clearInterval($el.data('i18Now_interval'));
                }
                var interval = setInterval(function(){
                    $el.text(parseFormat($el.data('i18Now_options'), new Date()));
                }, every * 1000);
                $el.data('i18Now_interval', interval);
            });
        },

        // Set a custom static date. Param must be a Date object
        setCustomDate : function(dateObj, fallback){
            if(typeof fallback === "undefined"){
                fallback = 'Invalid Date';
            }
            if(dateObj.getTime() === 0 || isNaN(dateObj.getTime())){
                this.text(fallback);
            }
            else{
                this.text(parseFormat(this.data('i18Now_options'), dateObj));
            }
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
        }
    };
})(jQuery);