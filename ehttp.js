// EasyHTTP 0.1 by theLMGN
alert(`EasyHTTP has been depreciated.

If you're a developer of ${location.hostname}, Check the DevTools for migration information`)
console.error(`EasyHTTP has been depreciated. Please move to the Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch`)
function asyncHTTP(url,method){return new Promise(function(a,r){if(!method){method="GET"}var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){a(xhttp.responseText)}else if(this.readyState==4){r(this,xhttp)}};xhttp.open(method,url,true);xhttp.send()})}function cbHTTP(url,cb,method){if(!method){method="GET"}var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){cb(null,xhttp.responseText)}else if(this.readyState==4){cb(this)}};xhttp.open(method,url,true);xhttp.send()}