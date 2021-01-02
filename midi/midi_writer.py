from midiutil import MIDIFile

import os,sys,inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from notation_system.notational_entities import RhythmicValue, Pitch, Rest
     
     
class MidiWriter:
    def write_midi_from_counterpoint(self, lines: list[list[RhythmicValue]], filename: str, speed_up: float = 1.0 ) -> None:
        if lines is None: return
        tempo = 672 * speed_up
        channel = 0
        start_time = 0
        CounterpointMIDI = MIDIFile(len(lines), deinterleave=False, removeDuplicates=False)
        for i, line in enumerate(lines):
            #75 is the "recorder" instrument in General MIDI
            instrument = 75 if i == 0 else 70
            volume_level = 100 if i == 0 else 85
            CounterpointMIDI.addProgramChange(0, i, 0, instrument)
            track = i
            channel = i
            CounterpointMIDI.addTempo(track, start_time, tempo)
            time_index = start_time
            for entity in line + [Rest(8)]:
                duration = entity.get_duration()
                pitch = entity.get_pitch_value() if isinstance(entity, Pitch) else 0
                volume = volume_level if isinstance(entity, Pitch) else 0
                CounterpointMIDI.addNote(track, channel, pitch, time_index, duration, volume)
                time_index += duration
        with open(filename, "wb") as output_file:
            CounterpointMIDI.writeFile(output_file)
           