import os,sys,inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
sys.path.insert(0, current_dir)

from flask import Flask, request, send_file

from generate_from_json import GenerateFromJson

app = Flask(__name__)

@app.route("/", methods=["POST"])
def index():
    json_request = request.get_json()
    counterpoint_id = GenerateFromJson().generate_from_json(json_request)
    try:
        return send_file(counterpoint_id + ".wav", as_attachment=True)
    except FileNotFoundError:
        return "file note found"

if __name__ == "__main__":
    app.run(debug=True)