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
    <a class="regular sociallink ${check.statusClass == "success" ? "up" : "down"}" href="//status.thelmgn.com/${check.monitorId}">
    <i class="fas fa-thumbs-${check.statusClass == "success" ? "up" : "down"} fa-fw"></i> ${check.name} (${check.weeklyRatio.ratio}%)<br>
    </a>`
}
var gotStatus = false

async function fetchStatus() {
    document.querySelector("#statuscontainer").style.filter = "blur(3px) brightness(50%)"
    try {
        var statusFetch = await fetch("https://cors-anywhere.herokuapp.com/https://status.thelmgn.com/api/getMonitorList/jZl0ksrZq")
        var status = await statusFetch.json()
        var string = `<h3 class="device-text mono italic">Last downtime: ${status.statistics.latest_downtime}</h3><h3 class="device-text mono italic" id="statusUpdate">Next update: 60 seconds</h3>`
        for (var check of status.psp.monitors) {
            string += generate(check)
        }
        document.querySelector("#statuscontainer").innerHTML = string
        document.querySelector("#statuscontainer").style.filter = ""
        cbTime = 60
    } catch(e) {
        console.error(e)
        cbTime = 5
    }
}
fetchStatus()