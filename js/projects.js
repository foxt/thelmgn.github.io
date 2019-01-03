
var gotProjects = false

async function fetchProjects() {
    try {
        var githubFetch = await fetch("https://updown.io/api/checks?api-key=ro-XWMrTMDi6HzxBvYAaStE")
        var projects = await projectsFetch.json()
    } catch(e) {
        console.error(e)
        setTimeout(fetchProjects,5000)
    }
}
