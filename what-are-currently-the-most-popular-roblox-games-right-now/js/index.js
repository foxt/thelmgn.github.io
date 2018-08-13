
// function fromHSV(h, s, v) {
//     var r, g, b, i, f, p, q, t;
//     if (arguments.length === 1) {
//         s = h.s, v = h.v, h = h.h;
//     }
//     i = Math.floor(h * 6);
//     f = h * 6 - i;
//     p = v * (1 - s);
//     q = v * (1 - f * s);
//     t = v * (1 - (1 - f) * s);
//     switch (i % 6) {
//         case 0: r = v, g = t, b = p; break;
//         case 1: r = q, g = v, b = p; break;
//         case 2: r = p, g = v, b = t; break;
//         case 3: r = p, g = q, b = v; break;
//         case 4: r = t, g = p, b = v; break;
//         case 5: r = v, g = p, b = q; break;
//     }
//     return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }

// function getGameColor(gameId) {
//   var h = ((1103515245 * gameId + 12345) % 0x80000000) / (0x80000000 - 1);
//   var s = ((251560153 * h + 12345) % 0x80000000) / (0x80000000 - 1)
//   var v = ((251560153 * s + 12345) % 0x80000000) / (0x80000000 - 1)
//   console.log(v)
//   return fromHSV(h,(s/5) + 0.25,(v / 10) + 0.9)
// }

titles = [];
cumulativePlayers = [];

var ctx = document.getElementById('chart').getContext('2d');	

var lineChartData = {
			labels: titles,
			datasets: [{
				label: 'Players',
				borderColor: "rgb(255,0,0)",
				backgroundColor: "rgb(255,0,0)",
				fill: true,
				data: cumulativePlayers,
			}]
		};
chart = Chart.Line(ctx, {
            data: lineChartData,
				options: {

					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: true,
						text: 'Chart of players in the top 40 games over time'
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
              ticks: {
                stepSize: 1
            }
						}],
					}
				}
			});








var colorScheme = "danger"
var lastUpdate = 0

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function purchasesToTag(game) {
  if (game.TotalBought > 0) {
    if (game.Price > 0) {
      return `<span class='tag is-success'>${game.Price} R$ (${numberWithCommas(game.TotalBought)} purchases)</span>`
    } else {
      return `<span class='tag is-danger'>Now free (${numberWithCommas(game.TotalBought)} purchases when paid)</span>`
    }
  } else{
    return ""
  }
}

function ldToTag(like,dislike) {
  if (dislike == 0) {
    if (like == 0) {
      return "<span class='tag is-danger'>No votes.</span>"
    } else {
      return "<span class='tag is-success'>100% upvoted.</span>"
    }
  }
  var percent = like/(dislike+like);
  if (percent > 0.75) {
    return ` <span class='tag is-success'>${Math.floor(percent *100)}% upvoted.</span>`
  } else if (percent < 0.25) {
    return ` <span class='tag is-danger'>${Math.floor(percent * 100)}% upvoted.</span>`
  } else {
    return ` <span class='tag is-warning'>${Math.floor(percent *100)}% upvoted.</span>`
  }
}
function updateColorScheme(newColorScheme) {
  
while (document.querySelector(`.is-${colorScheme}`)) {
document.querySelector(`.is-${colorScheme}`).className = document.querySelector(`.is-${colorScheme}`).className.replace(colorScheme,newColorScheme)
}
  colorScheme = newColorScheme;
}





function returnTrHtml(game) {
  return `<tr>
        <td>
          <b>
              ${game.Name}
              <a target="_blank" href="${game.CreatorUrl}"><span class="tag is-danger" >By ${game.CreatorName}</span></a>
              <span class="tag is-${colorScheme}">${numberWithCommas(game.PlayerCount)} online now! (${numberWithCommas(game.Plays)} total plays)</span>
            <a target="_blank" href="${game.GameDetailReferralUrl}"><span class="tag is-danger">View on Roblox</span></a> ${purchasesToTag(game)} ${ldToTag(game.TotalUpVotes,game.TotalDownVotes)} 
<img src="${game.Url}" class="game-thumb"></img>
          </b>
        </td>
      </tr>`;
}
function update() {
  document.querySelector("#loader").style.display = "block";
  document.querySelector("tbody").style.opacity = "0.5";
  document.querySelector("tbody").style.filter = "grayscale(1) blur(1px)";
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://assets.thelmgn.com/rblx/apis/rblx-proxy.php?dir=games/list-json?SortFilter=1', true);

xhr.onload = function () {
  
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            console.log(json)
            document.querySelector("tbody").innerHTML = "";
            document.querySelector("#loader").style.display = "none";
          document.querySelector("tbody").style.opacity = "1";
          document.querySelector("tbody").style.filter = "";
          var players = 0;
            for (var g in json) {
              var game = json[g]
              document.querySelector("tbody").innerHTML = document.querySelector("tbody").innerHTML + 
               returnTrHtml(game)
              players = players + game.PlayerCount
            }
            titles.push(new Date());
            cumulativePlayers.push(players);
          chart.update(1,false);
            lastUpdate = performance.now();
        } else {
          alert("Error: " + xhr.status)
        }
    }
};

xhr.send(null);
}
update()
setInterval(update,30000)

setInterval(function() {
  document.querySelector("#lastupdated").innerText = Math.floor(performance.now() /1000 - lastUpdate / 1000) + "s ago. "
},100)