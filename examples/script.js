$(function(){

    // Format examples, is up to you how to retrieve these formats, and to decide how many formats you need
    var formatsExamples = {
        "usa" :{
            "D" : ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"],
            "l" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "M" : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "F" : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "format" : "%l, %F %d, %Y %h:%i:%s %A"
        },

        "ita": {
            "D" : ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
            "l" : ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
            "M" : ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
            "F" : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno","Luglio","Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            "format" : "%l %d %F %Y %H:%i:%s"
        },

        "spa" : {
            "D" : ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            "l" : ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            "M" : ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            "F" : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            "format" : "%l %d de %F de %Y %H:%i:%s"
        },

        "rus" : {
            "D" : ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
            "l" : ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            "M" : ["янв.", "февр.", "марта", "апр.", "мая", "июня", "июля", "авг.", "сент.", "окт.", "нояб.", "дек."],
            "F" : ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            "format" : "%l, %d %F %Y г. %H:%i:%s"
        },

        "zho" : {
            "D" : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            "l" : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            "M" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            "F" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            "ampm" : ["上午", "下午"],
            "format" : "%Y年%F%d%l %a%g:%i:%s"
        },

        "jpn" : {
            "D" : ["日", "月", "火", "水", "木", "金", "土"],
            "l" : ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
            "M" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            "F" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            "format" : "%Y年%F%d%l %G:%i:%s"
        }
    };

    // Static date and time
    $("#date-usa-static").i18Now(formatsExamples.usa);

    // Updated date and time
    $("#date-usa-updated").i18Now(formatsExamples.usa);
    $("#date-usa-updated").i18Now('update', 1);

    //Different date format
    $("#date-usa-long").i18Now({format : "%F %j, %Y"});
    $("#date-usa-medium").i18Now({format : "%M %j, %Y"});
    $("#date-usa-short").i18Now({format : "%n/%j/%Y"});

    // Translated date and time
    $("#date-ita").i18Now(formatsExamples.ita);
    $("#date-ita").i18Now('update', 1);
    $("#date-jpn").i18Now(formatsExamples.jpn);
    $("#date-jpn").i18Now('update', 1);
    $("#date-rus").i18Now(formatsExamples.rus);
    $("#date-rus").i18Now('update', 1);
    $("#date-zho").i18Now(formatsExamples.zho);
    $("#date-zho").i18Now('update', 1);
    $("#date-spa").i18Now(formatsExamples.spa);
    $("#date-spa").i18Now('update', 1);

    // Custom dates
    $("#date-custom").i18Now({format : "It's %l, %j/%F/%y"});
    $("#date-custom").i18Now('setCustomDate', new Date(1982, 9, 3));

    $("#date-custom").i18Now(formatsExamples.ita);
    $("#date-custom").i18Now({format : "Domani sarà %l, %j/%F/%y"});
    $("#date-custom").i18Now('setCustomDate', new Date(1982, 9, 3));

});