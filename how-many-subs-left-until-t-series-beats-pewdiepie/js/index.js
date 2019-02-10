function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


;(function ( $, window, document, undefined ) {
  
  var pluginName = "numerator",
  defaults = {
    easing: 'swing',
    duration: 500,
    delimiter: undefined,
    rounding: 0,
    toValue: undefined,
    fromValue: undefined,
    onStart: function(){},
    onStep: function(){},
    onProgress: function(){},
    onComplete: function(){}
  };
  
  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  
  Plugin.prototype = {
    init: function () {
      this.parseElement();
      this.setValue();
    },
    
    parseElement: function () {
      var elText = $(this.element).text().trim();
      
      this.settings.fromValue = this.format(elText);
    },
    
    setValue: function() {
      var self = this;
      
      $({value: self.settings.fromValue}).animate({value: self.settings.toValue}, {
        
        duration: parseInt(self.settings.duration),
        
        easing: self.settings.easing,
        
        start: self.settings.onStart,
        
        step: function(now, fx) {
          
          $(self.element).text(numberWithCommas(self.format(now)));
          // accepts two params - (now, fx)
          self.settings.onStep(now, fx);
        },
        
        // accepts three params - (animation object, progress ratio, time remaining(ms))
        progress: self.settings.onProgress,
        
        complete: self.settings.onComplete
      });
    },
    
    format: function(value){
      if (this.settings.rounding < 1) {
        if (typeof value == "string") {
          value = value.replace(/,/g,"")
        }
        return parseInt(value);
      } else {
        return parseFloat(value).toFixed(this.settings.rounding);
      }
    }
  };
  
  $.fn[ pluginName ] = function ( options ) {
    if (!document.querySelector("#animations").checked) {
      this[0].innerText = options.toValue
    } else {
      return this.each(function() {
        if ( $.data( this, "plugin_" + pluginName ) ) {
          $.data(this, 'plugin_' + pluginName, null);
        }
        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        
      });
    }
  };
  
})( jQuery, window, document );



const pvts = {
  pew: {
    name: "Felix",
    account: "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
  },
  ts: {
    name: "T-Series",
    account: "UCq-Fj5jknLsUf-MWSy4_brA"
  }
}
const sub2willne = {
  pew: {
    name: "WillNE",
    account: "UCaFUrR3oSxOl5Y9y6tvLTEg"
  },
  ts: {
    name: "Morgz' Mum",
    account: "UCqsUQhA6UIwSams54bEnCJw"
  }
}
var strings =  pvts
if (location.hash == "#willne") {
  strings = sub2willne
}

var pewSub = 0
var oldPew = 0
var tSub = 0
var oldT = 0
var gotPew = false
var gotT = false

String.prototype.toHHMMSS = function () {
  var delta = new Number(this)
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;
  
  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  
  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  
  return days + "d " + hours + "h " + minutes + "m"
}

function checkChannel(channel,callback) {
  try {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText)
      }
    };
    xhttp.open("GET", `https://youtubeapis--thelmgn.repl.co/${channel}`, true);
    xhttp.send();
  } catch(e) {}
}
function checkPew() {
  document.querySelector("#pew").style.opacity = "0.6"
  
  checkChannel(strings.pew.account,function(subs) {
    pewSub = subs
    gotPew = true
    setTimeout(checkPew,5000)
    document.querySelector("#pew").style.opacity = "1"
  })
}
function checkT() {
  document.querySelector("#ts").style.opacity = "0.6"
  checkChannel(strings.ts.account,function(subs) {
    tSub = subs
    gotT = true
    setTimeout(checkT,5000)
    document.querySelector("#ts").style.opacity = "1"
  })
}

function checkSub() {
  checkPew()
  checkT()
}
checkSub()
setInterval(function() {
  if (gotT && gotPew) {
    render()
    gotT = false
    gotPew = false
  }
})


var oldDiff = 0;
function render() {
  document.querySelector("#pew").innerText = strings.pew.name
  document.querySelector("#ts").innerText = strings.ts.name
  $("#pewSub").numerator({duration: "4900", rounding: "0", toValue: pewSub, easing: "linear"})
  $("#tSub").numerator({duration: "4900", rounding: "0", toValue: tSub, easing: "linear"})
  if (oldT < tSub) {
    document.querySelector("#tSub").className = "plus"
  } else if (tSub > tSub){
    document.querySelector("#tSub").className = "neg"
  } else {
    document.querySelector("#tSub").className = ""
  }
  if (oldPew < pewSub) {
    document.querySelector("#pewSub").className = "plus"
  } else if (oldPew > pewSub) {
    document.querySelector("#pewSub").className = "neg"
  } else {
    document.querySelector("#pewSub").className = ""
  }
  oldT = tSub
  oldPew = pewSub
  var diff = 0
  if (tSub > pewSub) {
    document.querySelector("#bg").className = "ts"
    document.querySelector("#winner").innerText = strings.ts.name
    diff = tSub - pewSub
  } else {
    document.querySelector("#bg").className = "pew"
    document.querySelector("#winner").innerText = strings.pew.name
    diff = pewSub - tSub
    
  }
  $("#subDiff").numerator({duration: "4900", rounding: "0", toValue: diff, easing: "linear"})
  var result = ((diff - Math.floor(oldDiff - diff)) * 5).toString().toHHMMSS();
  document.querySelector("#rate").innerText = result
  if (oldDiff < diff) {
    document.querySelector("#subDiff").className = "plus"
  } else if (diff < oldDiff) {
    document.querySelector("#subDiff").className = "neg"
  } else {
    document.querySelector("#subDiff").className = ""
  }
  oldDiff = diff
}

function switchPew() {
  strings = pvts
  checkSub()
}
function switchWillNE() {
  strings = sub2willne
  checkSub()
}