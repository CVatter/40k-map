
import sqlite3

DATABASE = "images.db"

def create_tables():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS key_characters")
    cursor.execute("DROP TABLE IF EXISTS purchase_links")
    cursor.execute("DROP TABLE IF EXISTS images")

    cursor.execute("""
        CREATE TABLE images (
            id TEXT PRIMARY KEY,
            title TEXT,
            src TEXT,
            category TEXT,
            date TEXT,
            author TEXT,
            series_num TEXT,
            timeframe TEXT,
            brief_description TEXT,
            additional_info TEXT,
            next_id TEXT,
            prev_id TEXT,
            FOREIGN KEY (next_id) REFERENCES images(id),
            FOREIGN KEY (prev_id) REFERENCES images(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE key_characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_id TEXT,
            character_name TEXT,
            FOREIGN KEY (image_id) REFERENCES images(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE purchase_links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_id TEXT,
            url TEXT,
            FOREIGN KEY (image_id) REFERENCES images(id)
        )
    """)

    conn.commit()
    conn.close()

    print("Database tables created successfully!")


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def get_all_images():
    conn = get_db()
    images = conn.execute("SELECT * FROM images").fetchall()
    conn.close()
    return images

def get_image(image_id):
    conn = get_db()

    image = conn.execute(
        "SELECT * FROM images WHERE id = ?",
        (image_id,)
    ).fetchone()

    conn.close()
    return image

def get_characters(image_id):
    conn = get_db()

    characters = conn.execute(
        "SELECT character_name FROM key_characters WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    conn.close()
    return [row["character_name"] for row in characters]

def get_purchase_links(image_id):
    conn = get_db()

    links = conn.execute(
        "SELECT url FROM purchase_links WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    conn.close()
    return [row["url"] for row in links]


if __name__ == "__main__":
    create_tables()

