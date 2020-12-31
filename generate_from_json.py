import os,sys,inspect,shutil
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
sys.path.insert(0, current_dir)

from midi2audio import FluidSynth

from zipfile import ZipFile
import math
from random import random, randint, shuffle
from uuid import uuid4

from notation_system.notational_entities import Pitch, RhythmicValue, Rest, Note, Mode, Accidental, VocalRange, Hexachord
from midi.midi_writer import MidiWriter
from score.lilypond_template_writer import TemplateWriter

from counterpoint_generator.base_class import CounterpointGenerator
from counterpoint_generator.cantus_firmus import CantusFirmusGenerator
from counterpoint_generator.free_melody import FreeMelodyGenerator
from counterpoint_generator.two_part_first_species import TwoPartFirstSpeciesGenerator
from counterpoint_generator.two_part_second_species import TwoPartSecondSpeciesGenerator
from counterpoint_generator.two_part_third_species import TwoPartThirdSpeciesGenerator
from counterpoint_generator.two_part_fourth_species import TwoPartFourthSpeciesGenerator
from counterpoint_generator.two_part_fifth_species import TwoPartFifthSpeciesGenerator
from counterpoint_generator.two_part_free_counterpoint import TwoPartFreeCounterpointGenerator
from counterpoint_generator.two_part_imitative_counterpoint import TwoPartImitativeCounterpointGenerator

class GenerateFromJson:

    def generate_from_json(self, json_request: dict) -> str:
        
        counterpoint_type = json_request["type"]
        length = json_request["length"]
        lines = [self._get_vocal_range(vocal_range) for vocal_range in json_request["lines"]]
        mode = self._get_mode(json_request["mode"])
        cf_index = json_request["cantusFirmusIndex"]

        count = 0
        MAX_COUNT = 10
        optimal = None
        while optimal is None and count < MAX_COUNT:
            generator = self._get_generator(counterpoint_type, length, lines, mode, cf_index)
            generator.generate_counterpoint()
            generator.score_solutions()
            optimal = generator.get_one_solution()
            if optimal is not None:
                generator.print_counterpoint()
        if optimal is None:
            return ""
        else:
            counterpoint_id = str(uuid4())
            shutil.rmtree("generated_files_store")
            os.mkdir("generated_files_store")

            mw = MidiWriter()
            mw.write_midi_from_counterpoint(optimal,"generated_files_store/" + counterpoint_id + ".mid", speed_up=1) 
            sound_font_file_name = self._get_sound_font_file_name(lines[-1])
            fs = FluidSynth("sound_fonts/" + sound_font_file_name)
            # fs.play_midi(counterpoint_id + ".mid")
            fs.midi_to_audio( "generated_files_store/" + counterpoint_id + ".mid", "generated_files_store/" + counterpoint_id + ".wav")
            # tw = TemplateWriter()
            # tw.write_template_from_counterpoint(optimal, lines, counterpoint_id + ".ly")
            return counterpoint_id

    def _get_vocal_range(self, json_vocal_range: str) -> VocalRange:
        if json_vocal_range == "bass": return VocalRange.BASS
        if json_vocal_range == "tenor": return VocalRange.TENOR
        if json_vocal_range == "alto": return VocalRange.ALTO
        if json_vocal_range == "soprano": return VocalRange.SOPRANO

    def _get_mode(self, json_mode: str) -> Mode:
        if json_mode == "ionian": return Mode.IONIAN
        if json_mode == "dorian": return Mode.DORIAN
        if json_mode == "phrygian": return Mode.PHRYGIAN
        if json_mode == "lydian": return Mode.LYDIAN
        if json_mode == "mixolydian": return Mode.MIXOLYDIAN
        if json_mode == "aeolian": return Mode.AEOLIAN

    def _get_generator(self, counterpoint_type: str, length: int, lines: list[VocalRange], mode: Mode, cf_index: int) -> CounterpointGenerator:
        if counterpoint_type == "cantusFirmus": return CantusFirmusGenerator(length, lines, mode)
        if counterpoint_type == "freeMelody": return FreeMelodyGenerator(length, lines, mode)
        if counterpoint_type == "twoPartFirstSpecies": return TwoPartFirstSpeciesGenerator(length, lines, mode, cf_index)
        if counterpoint_type == "twoPartSecondSpecies": return TwoPartSecondSpeciesGenerator(length, lines, mode, cf_index)
        if counterpoint_type == "twoPartThirdSpecies": return TwoPartThirdSpeciesGenerator(length, lines, mode, cf_index)
        if counterpoint_type == "twoPartFourthSpecies": return TwoPartFourthSpeciesGenerator(length, lines, mode, cf_index)
        if counterpoint_type == "twoPartFifthSpecies": return TwoPartFifthSpeciesGenerator(length, lines, mode, cf_index)
        if counterpoint_type == "twoPartFreeCounterpoint": return TwoPartFreeCounterpointGenerator(length, lines, mode)
        if counterpoint_type == "twoPartImitativeCounterpoint": return TwoPartImitativeCounterpointGenerator(length, lines, mode)

    def _get_sound_font_file_name(self, vocal_range: VocalRange) -> str:
        if vocal_range == VocalRange.SOPRANO:
            return "flute.sf2"
        if vocal_range == VocalRange.TENOR:
            return "horn.sf2"
        return "piano.sf2"