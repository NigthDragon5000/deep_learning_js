from flask_cors import CORS
from flask import Flask, render_template,json, jsonify

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def main():
    return render_template('index.html')


@app.route('/model')
def model():
    json_data = json.load(open("./model/model.json"))
    return jsonify(json_data)


  
if __name__ == "__main__":
  app.run()