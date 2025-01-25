import { Note, parseNotes } from "./note";

export interface SongConfig {
  bpm?: number
  /** Shifts the song by x octaves up/down */
  octaveShift?: number
  /** Changes the duration of notes, a factor of 2 would turn 4ths into 8ths */
  durationMultiplier?: number
}

export class Song {
  constructor(
    public notes: Note[],
    public config?: SongConfig
  ) {}
  
  /**
   * Parses a song definition array imported from this repo: https://github.com/robsoncouto/arduino-songs
   * @param def song definition
   * @param config song config options
   * @returns a new `Song` instance
   */
  static from(def: (string | number)[], config?: SongConfig) {
    return new Song(parseNotes(def), config)
  }

  /**
   * Creates a text representation of the song compatible with the `speaker` driver
   * @returns The song in the device compatible notation
   * @see https://man.freebsd.org/cgi/man.cgi?query=speaker
   */
  toString() {
    const octaveShift = this.config?.octaveShift ?? 0
    const durationMultiplier = this.config?.durationMultiplier ?? 1

    let out = ""
    let oct: number | null = null

    for (const note of this.notes) {
      const octave = note.octave + octaveShift

      if (oct != octave) {
        oct = octave
        out += `O${oct} `
      }

      const duration = note.duration * durationMultiplier
      out += `${note.note}${duration} `
    }
    return out.trim()
  }

  /**
   * Creates a ready-to-run shell command to play the song
   * @param config shell command creation config
   * @param config.maxLength The maximum length of notes per command to the device
   * @param config.device The linux device to pipe the music commands to
   * @returns 
   */
  toShellCommand({ maxLength = 16, device = "/dev/speaker" } = {}) {
    const notes = this.toString().split(" ")

    const commands: string[][] = []
    let i = 0
    let lastOct = ""

    while (i < notes.length) {
      const cmd: string[] = lastOct ? [lastOct] : []

      for (; i < notes.length && cmd.length < maxLength; i++) {
        const n = notes[i]
        cmd.push(n)
        if (n[0] == "O") lastOct = n
      }

      commands.push(cmd)
    }

    if (this.config?.bpm)
      commands.forEach(cmd => cmd.unshift(`T${this.config!.bpm}`))

    return commands
      .map(cmd => `echo "${cmd.join(" ")}" > ${device}`)
      .join(" && ")
  }
}