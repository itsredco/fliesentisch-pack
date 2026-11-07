// Eigene Blöcke des Servers (seit v1.0.10).
// Modelle, Blockstates und Texturen bauen tools/dattel-statue.mjs und tools/fliesentisch.mjs (liegen fertig in kubejs/assets),
// die Rezepte liegen in kubejs/data/kubejs/recipe/.
StartupEvents.registry('block', event => {
  // Relikt "Goldene Dattel" für die Taverne zur goldenen Dattel.
  // 'cardinal' = dreht sich beim Setzen zum Spieler, damit die Gedenktafel nach vorne zeigt.
  // Das Modell ist knapp 2 Blöcke hoch; Kollision und Umriss bis 1,5 Blöcke (höher geht bei Blöcken nicht sauber).
  event.create('goldene_dattel', 'cardinal')
    .displayName('Goldene Dattel')
    .soundType('metal')
    .hardness(3.0)
    .resistance(6.0)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .notSolid()
    .renderType('cutout')
    .box(1, 0, 1, 15, 24, 15, true)

  // Fliesentisch: mehrere nebeneinander werden zur Tafel. north/east/south/west = dort steht ein weiterer Fliesentisch;
  // an diesen Seiten fallen Rand und Beine weg. Beim Setzen bestimmt der Tisch das selbst, die Nachbarn
  // aktualisiert server_scripts/fliesentisch.js.
  const SEITEN = [BlockProperties.NORTH, BlockProperties.EAST, BlockProperties.SOUTH, BlockProperties.WEST]
  event.create('fliesentisch')
    .displayName('Fliesentisch')
    .soundType('wood')
    .hardness(2.0)
    .resistance(3.0)
    .tagBlock('minecraft:mineable/axe')
    .notSolid()
    .renderType('cutout')
    .property(BlockProperties.NORTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.WEST)
    .defaultState(s => SEITEN.forEach(p => s.set(p, false)))
    .placementState(s => {
      // Fehler hier dürfen das Setzen nicht abbrechen; notfalls korrigiert das Server-Skript den Zustand
      try {
        const b = s.block
        const tisch = n => n.id == 'kubejs:fliesentisch'
        s.set(BlockProperties.NORTH, tisch(b.north))
        s.set(BlockProperties.EAST, tisch(b.east))
        s.set(BlockProperties.SOUTH, tisch(b.south))
        s.set(BlockProperties.WEST, tisch(b.west))
      } catch (err) {
        console.warn('Fliesentisch placementState: ' + err)
      }
    })
    .box(0, 10.5, 0, 16, 16, 16, true)
})
