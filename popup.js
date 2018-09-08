// created by ru1
var URL = "";
function $(id){return document.getElementById(id);}

function inject_cookit(cookies){
    if(!cookies){
        $("status").innerHtml = "no cookie injected.";
        return;
    }
    if (!chrome.cookies){
        chrome.cookies = chrome.experimental.cookies;
    }
    d = new Date();
    expired = 365*10;
    e = d.setTime(d.getTime()/1000*expired*24*3600); 

    domain = URL.split("/")[2];
    if($('domain').value != domain){
        domain = $('domain').vlaue;
    }
    url = URL.split("/")[0] + "//" + domain;

    ck = cookies.split(";");
    for(i in ck){
        c = ck[i].replace(/^\s+|\s+$/g, "");
        if(!c) continue;
        k = c.split("=")[0].replace(/^\s+|\s+$/g, "").replace(" ", "+");
        v = c.split("=")[1].replace(/^\s+|\s+$/g, "").replace(" ", "+");
        chrome.cookies.set({
            'url':url,
            'name':k,
            'value':v,
            'path':'/',
            'domain':$('domain').value,
            'expirationDate':e
        });
    }
    $("status").innerHTML = "fuck it!";
}

function init(){
    $('area').focus();
    $('area').value = localStorage.getItem('cookies');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        URL = tabs.url;
        $('domain').value = URL.split("/")[2];
    });

    $('area').addEventListener("blur", function(){
        localStorage.getItem('cookies', $('area').value);
    });

    $('fvck').addEventListener("click", function(){
        inject_cookit($('area').value);
    });
}
document.addEventListener('DOMContentLoaded', init);