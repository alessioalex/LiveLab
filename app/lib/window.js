class Window {
  constructor({ isOpen = false, track, onClose, title, fullscreen = false, opacity}) {
    this.isOpen = open
    this.track = track
    this.onClose = onClose
    this.fullscreen = fullscreen
    this.title = ''
    this.opacity = opacity
  }

  open() {
    var windowSettings = "popup=yes,menubar=no,location=no,resizable=no,scrollbars=no,status=no,toolbar=no,location=no,chrome=yes";
    this.win = window.open('', JSON.stringify(Date.now()), windowSettings)
    this.win.onbeforeunload = this.onClose
    //hacky way to remove default controls: https://css-tricks.com/custom-controls-in-html5-video-full-screen/
    // https://stackoverflow.com/questions/4481485/changing-css-pseudo-element-styles-via-javascript
    var win = this.win
    var addRule = (function (style) {
      var sheet = win.document.head.appendChild(style).sheet;
      return function (selector, css) {
          var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {

              return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      };
    })(win.document.createElement("style"))

    addRule("::-webkit-media-controls", {
      display: "none"
    })

    var self = this
  setTimeout(function () {
    //  self.document.write('<title>My PDF File Title</title>')
    //this.win.onload = function () {
      self.win.document.body.style.backgroundColor = 'black'
      self.video = self.win.document.createElement('video')
      self.video.autoplay = true
      self.video.setAttribute('controls', false)
      self.video.setAttribute('allowFullScreen', true)
      self.video.style.width = "100%"
      self.video.style.height = "100%"
      self.video.style.objectFit = "fill"
      self.win.document.body.style.padding = "0px"
      self.win.document.body.style.margin = "0px"
      self.win.document.body.appendChild(self.video)

      self.setTrack(self.track)
      self.setTitle(self.title)
      self.setOpacity(self.opacity)
  //  }


    self.win.document.body.onkeydown = function(){
      //console.log("key")
      if(!self.fullscreen) {
        self.video.webkitRequestFullScreen()
        self.fullscreen = true
      } else {
        self.video.webkitExitFullScreen()
        self.fullscreen = false
      }
    }

  }, 100)
    //console.log('track is', this.track)
  }

  update(opts) {

    // how to improve this part?
    if (!this.track) this.track = null
    if (this.track === null) this.track = {id :null}
    if (!opts.track) opts.track = null
    if (opts.track === null) opts.track = {id :null}

    console.log('UPDATE', opts, this.track.id, opts.track.id)

    if (opts.isOpen !== this.isOpen) {
      if(opts.isOpen === true) {
        this.open()
      } else {
        this.close()
      }
      this.isOpen = opts.isOpen
    }

    if (opts.track.trackId !== this.track.trackId) {
        if(this.isOpen) this.setTrack(opts.track)
        this.track = opts.track
    }

    if (opts.title !== this.title) {
        if(this.isOpen) this.setTitle(opts.title)
        this.title = opts.title
    }

    if (opts.opacity !== this.opacity) {
      if(this.isOpen) this.setOpacity(opts.opacity)
      this.opacity = opts.opacity
    }
  }

  setOpacity(opacity) {
    console.log("setting opactity", opacity)
    this.video.style.opacity = parseFloat(opacity)/100
  }
  setTrack(track) {
    console.log('setting track ', track)
    if (track && track !== null) {
      if (track.id === null) {
        this.video.srcObject = null
      } else {
        var tracks = []
        tracks.push(track.track)
        var stream = new MediaStream(tracks) // stream must be initialized with array of tracks, even though documentation says otherwise
        this.video.srcObject = stream
      }
    //  this.win.document.title = track.id
    } else {
      // to do: remove track
    }
  }

  // to do
  setTitle(title) {
    console.log('set title')
    this.win.document.title = title
  }

  remove() {
    this.close()
  }

  close() {
    if(this.win) if(!this.win.closed) this.win.close()
  }
}


module.exports = Window
