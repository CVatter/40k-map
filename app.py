from flask import Flask, render_template
from image_data import IMAGES

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/info/<image_id>')
def info_page(image_id):

    image = IMAGES.get(image_id)

    if image is None:
        return "Image not found", 404

    return render_template('info.html', image=image)

if __name__ == '__main__':
    app.run(debug=True)

