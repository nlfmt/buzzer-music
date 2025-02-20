import { parseArgs } from "node:util"
import { Song } from "./src/song"

const args = parseArgs({
  options: {
    octaveShift: {
      type: "string",
      default: "0",
    },
    bpm: {
      type: "string",
    },
    help: {
      type: "boolean",
      short: "h",
    }
  },
  args: process.argv,
  allowPositionals: true,
})

if (args.values.help) {
  console.log(`Usage: convert [options] <songID>
Options:
  --octaveShift=<value>  Shift the octave of the song's notes by the given value
  --bpm=<value>          Set the BPM of the song
  --help, -h             Show this help message`)
  process.exit(0)
}

let url = args.positionals[2]
if (!url) {
  console.error("No URL/SongID provided")
  process.exit(1)
}

const res = await fetch(
  url.startsWith("http")
    ? url
    : `https://raw.githubusercontent.com/robsoncouto/arduino-songs/refs/heads/master/${url}/${url}.ino`
)

if (res.status === 404) {
  console.error(`Song '${url}' not found`)
  process.exit(1)
}
const text = await res.text()
const melody = /int melody\[\] = \{(?<melody>[^}]+)\}/.exec(text)?.groups?.melody

if (!melody) {
  console.error("No melody found in Arduino code")
  process.exit(1)
}

const def = melody
  .replace(/int melody\[\] = \{([^}]+)\}/, "$1")
  .replace(/\/\/[^]*?\n/g, "")
  .replace(/\s/g, "")
  .replace(/REST/g, "P")
  .replace(/NOTE_(\w+)/g, "$1")
  .split(",")
  .map(x => {
    const duration = parseInt(x)
    return isNaN(duration) ? x : duration
  })

const song = Song.from(def, {
  octaveShift: parseInt(args.values.octaveShift),
  bpm: args.values.bpm ? parseInt(args.values.bpm) : undefined,
})

console.log(song.toShellCommand())
