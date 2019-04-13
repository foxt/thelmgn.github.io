//https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
function scrollIt(destination,duration=200,easing='linear',callback){const easings={linear(t){return t},easeInQuad(t){return t*t},easeOutQuad(t){return t*(2-t)},easeInOutQuad(t){return t<0.5?2*t*t:-1+(4-2*t)*t},easeInCubic(t){return t*t*t},easeOutCubic(t){return--t*t*t+1},easeInOutCubic(t){return t<0.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart(t){return t*t*t*t},easeOutQuart(t){return 1- --t*t*t*t},easeInOutQuart(t){return t<0.5?8*t*t*t*t:1-8* --t*t*t*t},easeInQuint(t){return t*t*t*t*t},easeOutQuint(t){return 1+ --t*t*t*t*t},easeInOutQuint(t){return t<0.5?16*t*t*t*t*t:1+16* --t*t*t*t*t}};const start=window.pageYOffset;const startTime='now'in window.performance?performance.now():new Date().getTime();const documentHeight=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight);const windowHeight=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName('body')[0].clientHeight;const destinationOffset=typeof destination==='number'?destination:destination.offsetTop;const destinationOffsetToScroll=Math.round(documentHeight-destinationOffset<windowHeight?documentHeight-windowHeight:destinationOffset);if('requestAnimationFrame'in window===false){window.scroll(0,destinationOffsetToScroll);if(callback){callback()}return}function scroll(){const now='now'in window.performance?performance.now():new Date().getTime();const time=Math.min(1,(now-startTime)/duration);const timeFunction=easings[easing](time);window.scroll(0,Math.ceil(timeFunction*(destinationOffsetToScroll-start)+start));if(window.pageYOffset===destinationOffsetToScroll){if(callback){callback()}return}requestAnimationFrame(scroll)}scroll()}

function timeToString(time){var diff=new Date().getTime()-new Date(time).getTime();if(diff<0){diff= -diff}var date=new Date(diff);if(date.getTime()>31536000000){return(date.getUTCFullYear()-1970).toString()+" yr"}if(date.getTime()>2629800000){return date.getUTCMonth().toString()+" mo"}if(date.getTime()>86400000){return date.getUTCDate().toString()+" day"}if(date.getTime()>3600000){return date.getUTCHours().toString()+" hr"}if(date.getTime()>60000){return date.getUTCMinutes().toString()+" min"}if(date.getTime()>1000){return date.getUTCSeconds().toString()+" sec"}return date.getTime().toString()+" ms"}


function switchPane(from,to) {
  document.querySelector(from).style.transform = "translate(-100%,0%)";
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth',
  });
  scrollIt(0,500,'easeOutQuad');
  setTimeout(function() {
    document.querySelector(from).style.display = "none"
    document.querySelector(to).style.display = "block"
    setTimeout(function() {
      document.querySelector(to).style.transform = "translate(0%,0%)";
    },15)
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
function words() {
  document.body.style.opacity = "0"
  setTimeout(function() {
    location.replace("http://words.thelmgn.com")
  },250)
}

document.querySelector("#sociallinks").style.maxHeight = "1000vh";


document.querySelector("#devicesBtn").style.display = ""
document.querySelector("#statusBtn").style.display = ""
document.querySelector("#projectsBtn").style.display = ""
document.querySelector("#faqBtn").style.display = ""
document.querySelector("#wordsBtn").href = "javascript:words()"

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
    document.body.style.pointerEvents = "none"
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
