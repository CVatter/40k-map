
from flask import Flask, render_template
from image_data import IMAGES

app = Flask(__name__)

@app.route('/')
def home():
    connections = {
        image_id: {
            "next": image.get("next"),
            "prev": image.get("prev")
        }
        for image_id, image in IMAGES.items()
    }

    return render_template('index.html', connections=connections)

@app.route('/info/<image_id>')
def info_page(image_id):
    image = IMAGES.get(image_id)

    if image is None:
        return "Image not found", 404

    next_image = image.get("next")
    previous_image = image.get("prev")

    if next_image == "sink":
        next_image = None

    if previous_image == "sink":
        previous_image = None

    return render_template(
        'info.html',
        image=image,
        next_image=next_image,
        previous_image=previous_image
    )

if __name__ == '__main__':
    app.run(debug=True)
