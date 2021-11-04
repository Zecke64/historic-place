//==============================================================================
//	Cookie handling
//==============================================================================

// general get/set functions

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

//------------------------------------------------------------------------------
//      display shortly a confirmation tooltip
//------------------------------------------------------------------------------

function ShowForSomeTime(showTime)
{
        // showTime in milliseconds
        document.getElementById("cookie-saved").style.visibility='visible';
        window.setTimeout("document.getElementById('cookie-saved').style.visibility='hidden'", showTime);
}


//------------------------------------------------------------------------------
//      set language cookie
//------------------------------------------------------------------------------

function storeLang() {
    setCookie ("lang", sprache, 365);
    setCookie ("permalink", document.getElementById('permalink'), 365);
    ShowForSomeTime(800);
    //alert (document.cookie);
}


function storeCookie() {
    setCookie ("lang", sprache, 365);
    setCookie ("permalink", document.getElementById('permalink'), 365);
    ShowForSomeTime(800);
    //alert (document.cookie);
}

function switch_lang(lang) {
    var myele = document.getElementById('permalink');
    var mylink=myele.toString();

    var i = mylink.indexOf("/l/");
    var str1 = mylink.substring(0, i);
    var newlink = str1 + "/l/" + lang;
    var str2 = mylink.substr(i+3);
    i = str2.indexOf("/");
    newlink = newlink + str2.substr(i);
    window.location.href = newlink;

}

