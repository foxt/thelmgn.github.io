function getDLURL(qs) {
  var xhr = new XMLHttpRequest();
xhr.open("GET", "https://assets.thelmgn.com/rblx/apis/rblx-proxy.php?dir=asset?id=" + document.querySelector("input").value  );
xhr.responseType = "arraybuffer";

xhr.onload = function () {
    if (this.status === 200) {
        var blob = new Blob([xhr.response], {type: "application/roblox"});
        var objectUrl = URL.createObjectURL(blob);
        document.querySelector(qs).href = objectUrl
    }
};
xhr.send();
}

function verify() {
  console.log("Sending request...")
  $.get("https://assets.thelmgn.com/rblx/apis/rblx-asset.php?asset=" + document.querySelector("input").value, function(a) {
    var j = JSON.parse(a)
    if (j.AssetTypeId == 38) {
      document.querySelector(".is-link").style.display = ""
      document.querySelector(".is-success").style.display = ""
      getDLURL(".is-success")
      document.querySelector(".is-success").download = j.Name + ".rbxl"
      getDLURL(".is-link")
      document.querySelector(".is-link").download = j.Name + ".rbxm"
      hideL()
    } else {
      document.querySelector(".is-link").style.display = "none"
      document.querySelector(".is-success").style.display = "none"
      alert(j.Name + " is not a plugin!")
      hideL()
    }
  })
}

document.querySelector("input").onkeydown = function(evt) { 
  console.log(evt)
  if (evt.code == "KeyV") {
      navigator.clipboard.readText()
      .then(text => {
          document.querySelector("input").value = text.replace(/\D/g,'');
          showL()
          verify()
      })
      .catch(err => {
        alert("Failed to paste.")
      });
  } else if (evt.code = "Backspace") {
    document.querySelector("input").value = ""
    document.querySelector(".is-link").style.display = "none"
    document.querySelector(".is-success").style.display = "none"
  } else {
    evt.preventDefault()
  }
}

function showL() {
  document.querySelector(".loader").style.width = ""
  document.querySelector(".loader").style.height = ""
  document.querySelector(".loader").style.left = ""
  document.querySelector(".loader").style.top = ""
  document.querySelector("#loader").style.opacity = ""
  document.querySelector("#loader").style.pointerEvents = ""
}
function hideL() {
  document.querySelector(".loader").style.width = "100vh"
  document.querySelector(".loader").style.height = "100vh"
  document.querySelector(".loader").style.left = "calc(50vw - 50vh)"
  document.querySelector(".loader").style.top = "0"
  document.querySelector("#loader").style.opacity = "0"
  document.querySelector("#loader").style.pointerEvents = "none"
}


function downloadLevel() {
  
}
hideL()