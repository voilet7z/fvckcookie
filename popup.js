// created by ru1
var URL = "";
function $(id){return document.getElementById(id);}

function inject_cookie(cookies){
    if(!cookies){
        $("status").innerHTML = "no cookie injected.";
        return;
    }
    if (!chrome.cookies){
        chrome.cookies = chrome.experimental.cookies;
    }
    d = new Date();
    expired = 365*70;
    e = d.setTime(d.getTime()/1000+expired*24*3600); 

    domain = URL.split("/")[2];
    if($('domain').value != domain){
        domain = $('domain').value;
    }
    url = URL.split("/")[0] + "//" + domain;

    ck = cookies.split(";");
    for(i in ck){
        c = ck[i].replace(/^\s+|\s+$/g, "");
        if(!c) continue;
        k = c.split("=")[0].replace(/^\s+|\s+$/g, "").replace(" ", "+");
        var components = c.split('=');
        v = [components.shift(), components.join('=')][1];
        var dm = $('domain').value.split(".");
        dn = [dm.shift(), dm.join('.')][1];
        console.log("key",k);
        console.log("value",v);
        chrome.cookies.set({
            'url':url,
            'name':k,
            'value':v,
            'path':'/',
            'domain':dn,
            'expirationDate':e
        });
    }
    $("status").innerHTML = "fuck it!";
}


  

function init(){
    $('area').focus();
    $('area').value = localStorage.getItem('cookies');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        URL = tabs[0].url;
        $('domain').value = URL.split("/")[2];
});
    
    $('area').addEventListener("blur", function(){
        localStorage.setItem('cookies', $('area').value);
        chrome.cookies.getAll({"url":URL}, function(cookies){
            console.log(cookies)
            for(i=0; i<cookies.length;i++) {
                removeCookie(cookies[i]);
        }
        });
    
    //传入cookie对象删除cookie
        function removeCookie(cookie) {
            var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
            chrome.cookies.remove({"url": url, "name": cookie.name});
        }
    });

    $('fvck').addEventListener("click", function(){
        inject_cookie($('area').value);
    });
}
document.addEventListener('DOMContentLoaded', init);