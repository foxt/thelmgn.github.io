function timeToString(time) {
    var diff = new Date().getTime() - new Date(time).getTime()
    if (diff < 0) {diff = -diff}
    var date = new Date(diff)
    if (date.getTime() > 31536000000) {
        return (date.getUTCFullYear()-1970).toString() + " years"
    }
    if (date.getTime() > 2629800000) {
        return date.getUTCMonth().toString() + " months"
    }
    if (date.getTime() > 86400000) {
        return date.getUTCDate().toString() + " days"
    }
    if (date.getTime() > 3600000) {
        return date.getUTCHours().toString() + " hours"
    }
    if (date.getTime() > 60000) {
        return date.getUTCMinutes().toString() + " minutes"
    }
    if (date.getTime() > 1000) {
        return date.getUTCSeconds().toString() + " seconds"
    }
    return date.getTime().toString() + " ms"    
}

var cbTime = -1
setInterval(function() {
    cbTime = cbTime - 1
    document.querySelector("#statusUpdate").innerText = `Next update: ${cbTime} second${cbTime == 0 ? "" : "s"}`
    if (cbTime == 0) {
        fetchStatus()
    }
},1000)


function generate(check) {
    var down = ``
    if (check.down) {
        down = `<br>
        Down for: <b>${timeToString(check.down_since)}</b><br>Error code: <b>${check.error}</b>`
    }
    return `
    <a class="regular sociallink ${check.down ? "down" : "up"}" href="//updown.io/${check.token}">
    <i class="fas fa-thumbs-${check.down ? "down" : "up"} fa-fw"></i> ${check.alias} (${check.down ? "DOWN" : "UP"})<br>
    <h3 class="device-text">
    Uptime: <b>${check.uptime}%</b><br>
    Last checked: <b>${timeToString(check.last_check_at)}</b><br>
    Next check: <b>${timeToString(check.next_check_at)}</b>${down}
    </h3>
    </a>`
}
var gotStatus = false

async function fetchStatus() {
    document.querySelector("#statuscontainer").style.filter = "blur(3px) brightness(50%)"
    try {
        var statusFetch = await fetch("https://updown.io/api/checks?api-key=ro-XWMrTMDi6HzxBvYAaStE")
        var status = await statusFetch.json()
        var string = `<h3 class="device-text mono italic" id="statusUpdate">Next update: 60 seconds</h3>`
        for (var check of status) {
            string = string + generate(check)
        }
        document.querySelector("#statuscontainer").innerHTML = string
        document.querySelector("#statuscontainer").style.filter = ""
        cbTime = 60
    } catch(e) {
        console.error(e)
        cbTime = 5
    }
}
