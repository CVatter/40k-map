
import sqlite3
from pprint import pprint

conn = sqlite3.connect("images.db")
conn.row_factory = sqlite3.Row

image_id = input("Enter Image ID: ")

image = conn.execute(
    "SELECT * FROM images WHERE id = ?",
    (image_id,)
).fetchone()

if image is None:
    print("Image not found.")
else:
    image = dict(image)

    image["key_chars"] = [
        row["character_name"]
        for row in conn.execute(
            "SELECT character_name FROM key_characters WHERE image_id = ?",
            (image_id,)
        )
    ]

    image["purchase"] = [
        row["url"]
        for row in conn.execute(
            "SELECT url FROM purchase_links WHERE image_id = ?",
            (image_id,)
        )
    ]

    pprint(image, sort_dicts=False, width=100)

conn.close()
