
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

  
  document.querySelector("#clippyjs").innerHTML = `<link rel="stylesheet" type="text/css" href="clippy/clippy.css" media="all">`
  
  await loadScript("clippy/jquery.js")
  await loadScript("clippy/clippy.min.js")
  
  clippy.load('Clippy', function(agent){
    // do anything with the loaded agent
    agent.show();
    agent.speak("It looks like you're trying to gain extra lives on this website, would you like help with that?")
  });
}
(async function() {
  await loadScript("clippy/konami.js")
  new Konami(loadClippy)
})()
