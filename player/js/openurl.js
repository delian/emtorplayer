var Init = require('./init');

function OpenURL() {
    $('#openurl').dialog({
        modal: true,
        width: '95%',
        height: 200,
        buttons: {
            "Open": function() {
                var url = 'file://'+window.location.pathname+'?magnet='+escape($('#openurlForm').val());
                console.log('Will go for',url);
                window.location.href = url;
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
}

module.exports = OpenURL;