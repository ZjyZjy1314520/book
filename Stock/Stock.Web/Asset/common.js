var tool = {
    ConvertJSONDateToJSDateObject: function (jsondate) {
        var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
        return date;
    },
    getDate:function(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day ;
    },
    getDateTime:function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
}
}