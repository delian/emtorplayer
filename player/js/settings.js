var config = require('./config.js')();
var remote = require('remote');

function formSet(k,v) {
    config.get(k,function(err,value) {
        console.log('Found value',k,v,value);
        $('#'+v).val(value);
    });
}

function radioSet(k,v) {
    config.get(k,function(err,value) {
        console.log('Found value',k,v,value);
        $('#'+v+'1').prop('checked',value);
        $('#'+v+'2').prop('checked',!value);
    });
}

function initValues() {
    var o = {
        "peers": "peersForm",
        "download": "downloadForm",
        "upload": "uploadForm",
        "incport": "incPortForm",
        "subsdir": "subsdirForm",
        "downsize": "downsizeForm",
        "downdir": "downdirForm",
    };
    for (var k in o) formSet(k,o[k]);

    radioSet("subsauto","subsautoForm");
    radioSet("downclear","downclearForm");
}

function valSet(k,v) {
    config.set(k,v,function() {
        console.log('Value set',k,v,arguments);
    });
}

function readValues() {
    var o = {
        "peers": "peersForm",
        "download": "downloadForm",
        "upload": "uploadForm",
        "incport": "incPortForm",
        "subsdir": "subsdirForm",
        "downsize": "downsizeForm",
        "downdir": "downdirForm",
    };
    for (var k in o) valSet(k,$('#'+o[k]).val());

    valSet("subsauto",$("subsautoForm1").is(':checked'));
    valSet("downclear",$("downclearForm1").is(':checked'));
}

function Settings() {
    
    initValues();

    setTimeout(function() {
        $('#settings').dialog({
            modal: true,
            width: '95%',
            height: 380,
            buttons: {
                "Confirm & Restart": function() {
                    readValues();
                    remote.getCurrentWindow().reload();
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    },100);
}

module.exports = Settings;
