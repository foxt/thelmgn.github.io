try {
  //https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
  function scrollIt(destination,duration=200,easing='linear',callback){const easings={linear(t){return t},easeInQuad(t){return t*t},easeOutQuad(t){return t*(2-t)},easeInOutQuad(t){return t<0.5?2*t*t:-1+(4-2*t)*t},easeInCubic(t){return t*t*t},easeOutCubic(t){return--t*t*t+1},easeInOutCubic(t){return t<0.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart(t){return t*t*t*t},easeOutQuart(t){return 1- --t*t*t*t},easeInOutQuart(t){return t<0.5?8*t*t*t*t:1-8* --t*t*t*t},easeInQuint(t){return t*t*t*t*t},easeOutQuint(t){return 1+ --t*t*t*t*t},easeInOutQuint(t){return t<0.5?16*t*t*t*t*t:1+16* --t*t*t*t*t}};const start=window.pageYOffset;const startTime='now'in window.performance?performance.now():new Date().getTime();const documentHeight=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight);const windowHeight=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName('body')[0].clientHeight;const destinationOffset=typeof destination==='number'?destination:destination.offsetTop;const destinationOffsetToScroll=Math.round(documentHeight-destinationOffset<windowHeight?documentHeight-windowHeight:destinationOffset);if('requestAnimationFrame'in window===false){window.scroll(0,destinationOffsetToScroll);if(callback){callback()}return}function scroll(){const now='now'in window.performance?performance.now():new Date().getTime();const time=Math.min(1,(now-startTime)/duration);const timeFunction=easings[easing](time);window.scroll(0,Math.ceil(timeFunction*(destinationOffsetToScroll-start)+start));if(window.pageYOffset===destinationOffsetToScroll){if(callback){callback()}return}requestAnimationFrame(scroll)}scroll()}

  function timeToString(time){var diff=new Date().getTime()-new Date(time).getTime();if(diff<0){diff= -diff}var date=new Date(diff);if(date.getTime()>31536000000){return(date.getUTCFullYear()-1970).toString()+" yr"}if(date.getTime()>2629800000){return date.getUTCMonth().toString()+" mo"}if(date.getTime()>86400000){return date.getUTCDate().toString()+" day"}if(date.getTime()>3600000){return date.getUTCHours().toString()+" hr"}if(date.getTime()>60000){return date.getUTCMinutes().toString()+" min"}if(date.getTime()>1000){return date.getUTCSeconds().toString()+" sec"}return date.getTime().toString()+" ms"}

  console.log("Loading pages...")
  async function loadPage(page) {
    window[page] = await (await fetch(`${page}.html`)).text()
    try {
      var el = document.querySelector(`#${page}Btn`)
      el.onclick = function(e) {
        switchPage(page)
      }
      el.href = `javascript:;`
    } catch(e) {}
  }
  function loadPages() {
    loadPage("index")
    loadPage("faq")
    loadPage("devices")
    loadPage("projects")
    loadPage("status")
    loadPage("donate")
    requiresJS = ["status","projects"]
  }
  loadPages()
  

  function switchPageActual(to) {
    try {clearInterval(statusInterval)}catch(e){}
    document.querySelector("#replacableContent").style.transform = "translate(-100%,0%)";
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth',
    });
    scrollIt(0,500,'easeOutQuad');
    setTimeout(async function() {
      var el = document.createElement( 'html' );
      el.innerHTML = window[to]
      document.querySelector("#replacableContent").innerHTML = el.querySelector("#replacableContent").innerHTML
      loadPages()
      if (requiresJS.includes(to)) {
        await loadScript(`js/${to}.js`)
      }
      document.querySelector("#replacableContent").style.transform = "translate(0%,0%)";
    },750)
  }

  window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    var to = document.location.pathname.replace("/","").split(".")[0]
    switchPageActual(to)
  };

  function switchPage(to) {
    var toFriendly = " - " + to
    if (to == "index") {toFriendly = ""}
    document.title = "theLMGN v17.2" + toFriendly
    history.pushState({}, "theLMGN v17.2" + toFriendly, to + ".html");
    switchPageActual(to)
  }


  function words(e) {
    e.preventDefault()
    document.body.style.opacity = "0"
    setTimeout(function() {
      location.replace("http://words.thelmgn.com")
    },250)
    return false;
  }

  function registerClickThing(el) {
    el.onclick = function(e) {
      eval(el.dataset.js)
    }
  }
  function updateLinks() {
    for (var e of document.querySelectorAll(".jsBtn")) {
      e.href = `javascript:;`
      registerClickThing(e)
    }
  }
  updateLinks()

} catch(e){console.error(e)}

// CAD

window.onkeydown = function(evt) {
  if (evt.code == "Delete" && evt.altKey && (evt.ctrlKey || evt.metaKey)) {
    location.reload(true)
  }
}


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
  /*
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
  }*/
  location.replace("https://youtu.be/3N4yIDfN-M8")
}
(async function() {
  await loadScript("clippy/konami.js")
  new Konami(loadClippy)
})()

;(async function() {
  var date = new Date()
  if (date.getMonth() == 11) {
    await loadScript("https://cdn.jsdelivr.net/npm/magic-snowflakes@4.1.3/dist/snowflakes.min.js")
    var sf = new Snowflakes({
      color: "#ffffff",
      count: 75,
      minOpacity: 0.2,
      maxOpacity: 0.6
    });
  }
})()
