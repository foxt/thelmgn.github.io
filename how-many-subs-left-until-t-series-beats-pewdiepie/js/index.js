var pewSub = 0
var oldPew = 0
var tSub = 0
var oldT = 0
var gotPew = false
var gotT = false
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
String.prototype.toHHMMSS = function () {
  var delta = new Number(this)
    var days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

  return days + "d " + hours + "h " + minutes + "m"
}
    
function checkChannel(channel,callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(this.responseText)
      callback(json.items[0].statistics.subscriberCount)
    }
  };
  xhttp.open("GET", `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel}&key=AIzaSyCio_-QJ74DEF5Wp1ZGvVKw7eaKQxuUqiQ`, true);
  xhttp.send();
}
function checkPew() {
  checkChannel("UC-lHJZR3Gqxm24_Vd_AJ5Yw",function(subs) {
   pewSub = subs
    gotPew = true
    setTimeout(checkPew,5000)
 })
}
function checkT() {
  checkChannel("UCq-Fj5jknLsUf-MWSy4_brA",function(subs) {
    tSub = subs
    gotT = true
    setTimeout(checkT,5000)
 })
}

function checkSub() {
 checkPew()
 checkT()
}
checkSub()
setInterval(function() {
  if (gotT && gotPew) {
    render()
    gotT = false
    gotPew = false
  }
})


var oldDiff = 0;

function render() {
  document.querySelector("#pewSub").innerText = numberWithCommas(pewSub)
  document.querySelector("#tSub").innerText = numberWithCommas(tSub)
  if (oldT < tSub) {
    document.querySelector("#tDiff").className = "plus"
    document.querySelector("#tDiff").innerText = "+" + numberWithCommas(tSub - oldT)
  } else if (tSub > tSub){
    document.querySelector("#tDiff").className = "neg"
    document.querySelector("#tDiff").innerText = numberWithCommas(tSub - oldT)
  } else {
    document.querySelector("#tDiff").className = "ind"
    document.querySelector("#tDiff").innerText = "-0"
  }
  if (oldPew < pewSub) {
    document.querySelector("#pewDiff").className = "plus"
    document.querySelector("#pewDiff").innerText = "+" + numberWithCommas(pewSub - oldPew)
  } else if (oldPew > pewSub) {
    document.querySelector("#pewDiff").className = "neg"
    document.querySelector("#pewDiff").innerText = numberWithCommas(pewSub - oldPew)
  } else {
     document.querySelector("#pewDiff").className = "ind"
    document.querySelector("#pewDiff").innerText = "+0"
  }
  oldT = tSub
  oldPew = pewSub
  if (tSub > pewSub) {
    document.querySelector("#bg").className = "ts"
    document.querySelector("#winner").innerText = "T-Series"
    document.querySelector("#subDiff").innerText = numberWithCommas(tSub - pewSub)
    var result = (((tSub - pewSub) - Math.floor(oldDiff - (pewSub - tSub))) * 5).toString().toHHMMSS();
    document.querySelector("#rate").innerText = result
    oldDiff = tSub - pewSub
  } else {
    document.querySelector("#bg").className = "pew"
    document.querySelector("#winner").innerText = "Felix"
    document.querySelector("#subDiff").innerText = numberWithCommas(pewSub - tSub)
    var result = (((pewSub - tSub) - Math.floor(oldDiff - (pewSub - tSub))) * 5).toString().toHHMMSS();
    document.querySelector("#rate").innerText = result
      oldDiff = pewSub - tSub
    
  }
}