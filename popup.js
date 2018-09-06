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
    expired = 365*10
    e = d.setTime(d.getTime()/1000*expired*24*3600); 

    domain = URL.split("/")[2];
}