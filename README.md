# Buzzer Music

This repo contains code to create shell commands from songs using the /dev/speaker device in OpenBSD

# How to import a song from `arduino-songs`:

1. Visit [arduino-songs](https://github.com/robsoncouto/arduino-songs)
2. Pick a song of your choice and open its `.ino` file
3. Scroll down to the melody definition (prefixed by `int melody[] = {`)
4. Select the whole melody definition and copy it into a new file in `/songs` in this repo
5. Surround the melody definition with `export default [ ... ]`
6. Replace all underscores with dots
7. Import `NOTE` and `REST`
8. Go to the main file and create a Song instance from the definition
    ```ts
    import mysong from "./songs/mysong"

    const song = Song.from(mysong)
    
    console.log(song.toShellCommand())
    ```
9. Run the file with any js runtime, like bun:
    ```sh
    bun main.ts
    ```
10. Copy the command to your machine and run it