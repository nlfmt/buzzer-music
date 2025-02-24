
import { Song } from "./src/song"  

import merrychristmas from "./songs/merrychristmas"
import imperialMarch from "./songs/imperialMarch"
import cantinaband from "./songs/cantinaband"
import miitheme from "./songs/miitheme"
import rickroll from "./songs/rickroll"

const song = Song.from(imperialMarch, {
    octaveShift: -2,
    bpm: 120
})

console.log(song.toShellCommand())
