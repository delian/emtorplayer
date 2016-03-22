var Init = require('./init');

function submit() {
    var url = 'file://'+window.location.pathname+'?magnet='+escape($('#openurlForm').val());
    console.log('Will go for',url);
    window.location.href = url;
}

function OpenURL() {
    
    $('#openurlFormID').submit(submit);
    
    $('#openurl').dialog({
        modal: true,
        width: '95%',
        height: 200,
        buttons: {
            "Open": submit,
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
}

module.exports = OpenURL;