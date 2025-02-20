# Buzzer Music

This repo contains code to create shell commands from songs using the /dev/speaker device in OpenBSD

## How to import a song from `arduino-songs`:

1. Clone this repository
2. Make sure [NodeJS](https://nodejs.org) is installed
2. Install packages using `npm i`
3. Visit [arduino-songs](https://github.com/robsoncouto/arduino-songs)
5. Pick a song of your choice and note the folder name in the repo (i.e. `imperialmarch`)
8. Run the converter
```sh
npm run convert -- imperialmarch
```
with config options:
```sh
npm run convert -- imperialmarch --octaveShift=-2 --bpm=120
```

1. Copy the command to your machine and run it!

## How to add a custom note definition

1. Add a new file to `/songs`.
3. Add your song definition as a default export
```ts
import { NOTE, REST } from "../src/note"

export default [
    NOTE.A4, 4, REST, 2, NOTE.A5, 4
]
```
4. Go to `main.ts`, import your song definition and add the code to convert:
```ts
import mySong from "./songs/mySong"

const song = Song.from(mySong, { octaveShift: -2 })
console.log(song.toShellCommand())
```
5. Run the program using `npm start` (run `npm i` first if you haven't yet)
6. Run the code on your machine!