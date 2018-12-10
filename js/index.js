
function switchPane(devices) {
  if (devices == true) {
    document.querySelector("#sociallinks").style.maxHeight = "0";
    setTimeout(function() {
      document.querySelector("#devices").style.maxHeight = "1000vh";
    },1000)
  } else {
    document.querySelector("#devices").style.maxHeight = "0";
    setTimeout(function() {
      document.querySelector("#sociallinks").style.maxHeight = "1000vh";
    },1000)
  }
}
document.querySelector("#sociallinks").style.maxHeight = "1000vh";
document.querySelector("#devicesBtn").style.display = ""

//KONAMI

function loadScript(href) {
  return new Promise(function(a,r) {
    console.log("Loading " + href)
    var script = document.createElement('script');
    script.src = href;
    script.onload = a
    document.querySelector("#clippyjs").appendChild(script);
  })
}

async function loadClippy() {

  
  document.querySelector("#clippyjs").innerHTML = `<video src="clippy/peakaboo.webm" playsinline autoplay style="position:fixed;top:0;width:640px;height:480px;left:50vw;margin-left:-320px;"></video>`

}
(async function() {
  await loadScript("clippy/konami.js")
  new Konami(loadClippy)
})()
