
var gotProjects = false

//stolen from jQuery
function parseXml(data){var xml;if(!data||typeof data!=="string"){return null}try{xml=(new window.DOMParser()).parseFromString(data,"text/xml")}catch(e){xml=undefined}if(!xml||xml.getElementsByTagName("parsererror").length){throw new Error("Invalid XML: "+data)}return xml}

function renderProject(project) {
    return `
    <a class="regular sociallink project" href="${project.url}">
    <i class="fab fa-${project.type} fa-fw"></i> ${project.name} ${project.language ? `(${project.language})` : ""}<br>
    <h3 class="device-text">
    <b>Last updated:</b> ${timeToString(project.updated)} ago<br>
    ${project.desc}
    </h3>
    </a>`
}

async function fetchProjects() {
    try {
        var projects = []
        var githubFetch = await fetch("https://api.github.com/users/thelmgn/repos?sort=updatedd&per_page=1000")
        var githubRepos = await githubFetch.json()
        for (var repo of githubRepos) {
            if (!repo.fork) {
                projects.push({
                    name: repo.name,
                    language: repo.language,
                    url: repo.html_url,
                    desc: repo.description || "",
                    updated: new Date(repo.updated_at).getTime(),
                    type: "github"
                })
            }
        }
        console.log("Got GitHub repos")
        
        var codepenFetch = await fetch("https://codepen.io/thelmgn/public/feed")
        var codepenPensXML = await codepenFetch.text()
        var codepenPens = parseXml(codepenPensXML)
        for (var pen of codepenPens.querySelectorAll("item")) {
            projects.push({
                name: pen.querySelector("title").innerHTML,
                language: "HTML/CSS/JS",
                url: pen.querySelector("link").innerHTML,
                desc: "",
                updated: new Date(pen.getElementsByTagName("dc:date")[0].innerHTML.replace(/\n/g,"").replace(/ /g,"")).getTime(),
                type: "codepen"
            })
        }
        console.log("Got 10 latest pens")
        
        projects.sort(function(a, b){
            return b.updated - a.updated
        });
        console.log("Sorted")

        var string = ""
        for (var project of projects) {string = string + renderProject(project)}
        document.querySelector("#projectsContainer").innerHTML = string
        console.log("Rendered")
    } catch(e) {
        console.error(e)
        setTimeout(fetchProjects,5000)
    }
}

fetchProjects()