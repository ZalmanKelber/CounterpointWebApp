import zipfile

import os,sys,inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
sys.path.insert(0, current_dir)

from flask import Flask, request, send_file

from generate_from_json import GenerateFromJson

app = Flask(__name__)

@app.route("/api", methods=["POST"])
def index():
    json_request = request.get_json()
    print(json_request)
    counterpoint_id = GenerateFromJson().generate_from_json(json_request)
    try:
        print("counterpoint id:", counterpoint_id)
        return send_file("generated_files_store/" + counterpoint_id + ".wav", as_attachment=True)
    except FileNotFoundError:
        return "file note found"

@app.route("/generate", methods=["GET"])
def ind():
    print("endpoint reached")
    return "this is a backend endpoint"

if __name__ == "__main__":
    app.run(debug=True)