function switchPane(from,to) {
  document.querySelector(from).style.maxHeight = "0";
  setTimeout(function() {
    document.querySelector(to).style.maxHeight = "1000vh";
  },750)
  location.hash = to
}


function status() {
  switchPane("#sociallinks","#status")
  if (!gotStatus) {
    fetchStatus()
  } 
}

function projects() {
  switchPane("#sociallinks","#projects")
  if (!gotProjects) {
    fetchProjects()
  } 
}
document.querySelector("#sociallinks").style.maxHeight = "1000vh";


document.querySelector("#devicesBtn").style.display = ""
document.querySelector("#statusBtn").style.display = ""
document.querySelector("#projectsBtn").style.display = ""
document.querySelector("#faqBtn").style.display = ""

try {
  if (document.querySelector(location.hash)) {
    switchPane("#sociallinks",location.hash)
    if (location.hash = "#status") {
      fetchStatus()
    }
    if (location.hash = "#projects") {
      fetchProjects()
    }
  }
} catch(e){}


//KONAMI

function loadScript(href) {
  return new Promise(function(a,r) {
    console.log("Loading " + href)
    var script = document.createElement('script');
    script.src = href;
    script.onload = a
    document.body.appendChild(script);
  })
}
var jameski= false
async function loadClippy() {
  if (jameski == false) {
    document.querySelector("#jameskii").style.display = "block"
    await document.querySelector("audio").play()
    jameski = true
    document.body.style.overflow = 'hidden'
    document.querySelector("audio").currentTime = 20.4
    document.querySelector("#jameskiitop").style.top = "0"
    document.querySelector("#jameskiibottom").style.bottom = "0"
    document.querySelector("#container").style.transform = "scale(2) rotate(20deg)"
    setTimeout(function() {
      document.querySelector("#container").style.transition = "240s transform"
      document.querySelector("#container").style.transform = "scale(10) rotate(90deg)"
    },500)
  }
}
(async function() {
  await loadScript("clippy/konami.js")
  new Konami(loadClippy)
})()
