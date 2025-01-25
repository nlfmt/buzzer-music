export const NOTE = {
  B0: "B0",
  C1: "C1",
  CS1: "CS1",
  D1: "D1",
  DS1: "DS1",
  E1: "E1",
  F1: "F1",
  FS1: "FS1",
  G1: "G1",
  GS1: "GS1",
  A1: "A1",
  AS1: "AS1",
  B1: "B1",
  C2: "C2",
  CS2: "CS2",
  D2: "D2",
  DS2: "DS2",
  E2: "E2",
  F2: "F2",
  FS2: "FS2",
  G2: "G2",
  GS2: "GS2",
  A2: "A2",
  AS2: "AS2",
  B2: "B2",
  C3: "C3",
  CS3: "CS3",
  D3: "D3",
  DS3: "DS3",
  E3: "E3",
  F3: "F3",
  FS3: "FS3",
  G3: "G3",
  GS3: "GS3",
  A3: "A3",
  AS3: "AS3",
  B3: "B3",
  C4: "C4",
  CS4: "CS4",
  D4: "D4",
  DS4: "DS4",
  E4: "E4",
  F4: "F4",
  FS4: "FS4",
  G4: "G4",
  GS4: "GS4",
  A4: "A4",
  AS4: "AS4",
  B4: "B4",
  C5: "C5",
  CS5: "CS5",
  D5: "D5",
  DS5: "DS5",
  E5: "E5",
  F5: "F5",
  FS5: "FS5",
  G5: "G5",
  GS5: "GS5",
  A5: "A5",
  AS5: "AS5",
  B5: "B5",
  C6: "C6",
  CS6: "CS6",
  D6: "D6",
  DS6: "DS6",
  E6: "E6",
  F6: "F6",
  FS6: "FS6",
  G6: "G6",
  GS6: "GS6",
  A6: "A6",
  AS6: "AS6",
  B6: "B6",
  C7: "C7",
  CS7: "CS7",
  D7: "D7",
  DS7: "DS7",
  E7: "E7",
  F7: "F7",
  FS7: "FS7",
  G7: "G7",
  GS7: "GS7",
  A7: "A7",
  AS7: "AS7",
  B7: "B7",
  C8: "C8",
  CS8: "CS8",
  D8: "D8",
  DS8: "DS8",
}

export const REST = "P"

export function parseNote(note: string) {
  let n = note[0]
  let oct
  if (note.length === 3) {
    n += note[1] === "S" ? "#" : "-"
    oct = note[2]
  } else {
    oct = note[1]
  }

  return {
    note: n,
    octave: Number(oct)
  }
}

export type Note = {
  note: string,
  octave: number,
  duration: number,
}

export function parseNotes(notes: (string | number)[]) {
  let res: Note[] = []
  
  for (let i = 0; i < notes.length; i += 2) {
    res.push({
      ...parseNote((notes[i] as string)),
      duration: Math.abs(notes[i + 1] as number)
    })
  }
  
  return res
}