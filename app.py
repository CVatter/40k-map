
from flask import Flask, render_template
from database import get_db

app = Flask(__name__)

@app.route('/')
def home():
    conn = get_db()

    rows = conn.execute("""
        SELECT id, src, category, title, brief_description, date, author
        FROM images
    """).fetchall()

    database_images = [dict(row) for row in rows]

    connections = {
        image["id"]: {
            "next": image["next_id"],
            "prev": image["prev_id"]
        }
        for image in conn.execute(
            "SELECT id, next_id, prev_id FROM images"
        ).fetchall()
    }

    conn.close()

    return render_template(
        'index.html',
        database_images=database_images,
        connections=connections
    )

@app.route('/info/<image_id>')
def info_page(image_id):
    conn = get_db()

    image = conn.execute(
        "SELECT * FROM images WHERE id = ?",
        (image_id,)
    ).fetchone()

    if image is None:
        conn.close()
        return "Image not found", 404

    image = dict(image)

    characters = conn.execute(
        "SELECT character_name FROM key_characters WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    purchase_links = conn.execute(
        "SELECT url FROM purchase_links WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    conn.close()

    image["key_chars"] = [row["character_name"] for row in characters]
    image["purchase"] = [row["url"] for row in purchase_links]

    next_image = image.get("next_id")
    previous_image = image.get("prev_id")

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
