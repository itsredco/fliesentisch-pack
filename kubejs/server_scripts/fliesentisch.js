// Fliesentisch zur Tafel verbinden (Block: startup_scripts/goldene_dattel.js, Modelle: tools/fliesentisch.mjs).
// Der neue Tisch kennt seine Nachbarn schon beim Setzen; hier erfahren die Nachbarn, dass ein Tisch dazugekommen
// oder weggekommen ist, damit sie Rand und Beine an dieser Seite weglassen bzw. wieder zeigen.
const FLIESENTISCH = 'kubejs:fliesentisch'

function fliesentischVerbinden(block) {
  if (block.id != FLIESENTISCH) return
  const tisch = n => String(n.id == FLIESENTISCH)
  block.set(FLIESENTISCH, { north: tisch(block.north), east: tisch(block.east), south: tisch(block.south), west: tisch(block.west) })
}

const fliesentischNachbarn = b => [b.north, b.east, b.south, b.west]

// den neuen Tisch selbst auch, falls er auf anderem Weg als per Hand gesetzt wurde
// (kein ...-Spread: Rhino kann das nicht)
BlockEvents.placed(FLIESENTISCH, e => [e.block].concat(fliesentischNachbarn(e.block)).forEach(fliesentischVerbinden))

// "broken" kommt, bevor der Block weg ist, deshalb einen Tick später nachsehen
BlockEvents.broken(FLIESENTISCH, e => {
  const nachbarn = fliesentischNachbarn(e.block)
  e.block.level.server.scheduleInTicks(1, () => nachbarn.forEach(fliesentischVerbinden))
})
