
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