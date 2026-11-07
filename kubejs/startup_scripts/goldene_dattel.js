// Relikt "Goldene Dattel" für die Taverne zur goldenen Dattel (seit v1.0.10).
// Modell, Blockstate und Texturen baut tools/dattel-statue.mjs (liegen fertig in kubejs/assets),
// das Rezept liegt in kubejs/data/kubejs/recipe/goldene_dattel.json.
// 'cardinal' = dreht sich beim Setzen zum Spieler, damit die Gedenktafel nach vorne zeigt.
// Das Modell ist knapp 2 Blöcke hoch; Kollision und Umriss bis 1,5 Blöcke (höher geht bei Blöcken nicht sauber).
StartupEvents.registry('block', event => {
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
})
