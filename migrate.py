
import sqlite3
from image_data import IMAGES

conn = sqlite3.connect("images.db")
cursor = conn.cursor()

for image_id, image in IMAGES.items():

    cursor.execute("""
        INSERT OR REPLACE INTO images (
            id, title, src, category, date, author,
            series_num, timeframe, brief_description,
            additional_info, next_id, prev_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        image_id,
        image.get("title"),
        image.get("src"),
        image.get("category"),
        image.get("date"),
        image.get("author"),
        image.get("series_num"),
        image.get("timeframe"),
        image.get("brief_description"),
        image.get("additional_info"),
        image.get("next"),
        image.get("prev")
    ))

    cursor.execute(
        "DELETE FROM key_characters WHERE image_id = ?",
        (image_id,)
    )

    for character in image.get("key_chars", []):
        cursor.execute("""
            INSERT INTO key_characters (image_id, character_name)
            VALUES (?, ?)
        """, (image_id, character))

    cursor.execute(
        "DELETE FROM purchase_links WHERE image_id = ?",
        (image_id,)
    )

    for link in image.get("purchase", []):
        cursor.execute("""
            INSERT INTO purchase_links (image_id, url)
            VALUES (?, ?)
        """, (image_id, link))

conn.commit()
conn.close()

print(f"Successfully imported {len(IMAGES)} images!")
