var config = require('./config.js')();

function formSet(k,v) {
    config.get(k,function(err,value) {
        console.log('Found value',k,v,value);
        $('#'+v).val(value);
    });
}

function initValues() {
    var o = {
        "peers": "peersForm",
        "download": "downloadForm",
        "upload": "uploadForm",
        "subsdir": "subsdirForm",
        "downsize": "downsizeForm",
        "downdir": "downdirForm",
    };
    for (var k in o) {
        formSet(k,o[k]);
    }
}

function Settings() {
    
    initValues();
    
    $('#settings').dialog({
        modal: true,
        width: '95%',
        height: 380,
        buttons: {
            "Confirm": function() {
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
}

module.exports = Settings;
