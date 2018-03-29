/* global nw */
const expose = require('choo-expose')
const log = require('choo-log')
const choo = require('choo')

const app = choo()

app.use(log())
app.use(expose())

// console.log("type", typeof nw)
if(typeof nw === 'object'){
  const WIN_WIDTH = 1280
  const WIN_HEIGHT = 720
  // if in dev mode, show logging in console and expose global app object
  // if (process.env.NODE_ENV === 'development') {
  // calculate screen dimensions to center window
  nw.Screen.Init()
  console.log('screens', nw.Screen.screens)

  var screenPos = nw.Screen.screens[0].work_area

  var winX = screenPos.x + (screenPos.width - WIN_WIDTH) / 2
  var winY = screenPos.y + (screenPos.height - WIN_HEIGHT) / 2

  var win = nw.Window.get()
  win.width = WIN_WIDTH
  win.height = WIN_HEIGHT
  // console.log(win)
  win.x = Math.floor(winX)
  win.y = Math.floor(winY)

  // var screenCB = {
  //   onDisplayBoundsChanged: function(screen) {
  //     console.log('displayBoundsChanged', screen);
  //   },
  //
  //   onDisplayAdded: function(screen) {
  //     console.log('displayAdded', screen);
  //   },
  //
  //   onDisplayRemoved: function(screen) {
  //     console.log('displayRemoved', screen)
  //   }
  // }
  //
  // // listen to screen events
  // nw.Screen.on('displayBoundsChanged', screenCB.onDisplayBoundsChanged)
  // nw.Screen.on('displayAdded', screenCB.onDisplayAdded)
  // nw.Screen.on('displayRemoved', screenCB.onDisplayRemoved)
}

app.use(require('./models/devicesModel.js'))
app.use(require('./models/mediaModel.js'))
app.use(require('./models/peersModel.js'))
app.use(require('./models/userModel.js'))
app.use(require('./models/uiModel.js'))
app.use(require('./models/oscModel.js'))
app.use(require('./models/showModel.js'))

// routing is different in nwjs vs browser version...include both routes to cover bases
app.route('/public/index.html', require('./views/main.js'))
app.route('', require('./views/main.js'))

app.mount('body div')
