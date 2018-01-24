'use strict'
const html = require('choo/html')
const inspector = require('./inspector.js')
const panel = require('./components/panel.js')

module.exports = mediaListView

function mediaListView (state, emit) {
  return html`

    <div class="pa3 dib" style="width:100%">
    <table style="width:100%" cellspacing="0" cellpadding="0" >
      <thead>
        <tr>
          <th style="width:20%">PEER</th>
          <th style="width:20%">NAME</th>
          <th style="width:20%">KIND</th>
          <th style="width:40%">ID</th>
        </tr>
      </thead>
      </table>
      <div style="max-height:180px;overflow-y:auto">
        <table cellspacing="0" cellpadding="0" >
          <tbody>
          ${state.media.all.map((id) => {
            var media = state.media.byId[id]
            var className = id == state.ui.inspector.trackId ? "bg-gray pointer" : "dim pointer"
            console.log(id, state.ui.inspector.trackId)
            return html`
              <tr class=${className} style="height:20px" onclick=${()=>{emit('user:setInspectMedia', id)}}>
                <td class="pa1" style="width:20%;height:20px">${state.peers.byId[media.peerId].nickname}</td>
                <td class="pa1" style="width:20%;height:20px">${media.name}</td>
                <td class="pa1" style="width:20%;height:20px">${media.track.kind}</td>
                <td class="pa1" style="width:40%;height:20px;font-size:8px">${media.track.id}</td>
              </tr>
            `
          })}

          </tbody>
      </table>
      </div>
        <div class="f6 fr ma2 link ph3 pv2 mb2 white bg-dark-pink pointer dib" onclick=${() => (emit('devices:toggleAddBroadcast', true))}>+ Add Broadcast</div>
        ${state.ui.inspector.trackId !== null ? inspector(state,emit) : ''}
    </div>
    `
}
