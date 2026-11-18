
import sqlite3

DATABASE = "images.db"

def add_image():
    image_id = input("Image ID: ")
    title = input("Title: ")
    src = input("Image path: ")
    category = input("Category: ")
    date = input("Date: ")
    author = input("Author: ")
    series_num = input("Series number: ")
    timeframe = input("Timeframe: ")
    brief_description = input("Brief description: ")
    additional_info = input("Additional information: ")

    next_id = input("Next image ID (leave blank if none): ")
    prev_id = input("Previous image ID (leave blank if none): ")

    characters = input("Key characters (separate with commas): ")
    purchase = input("Purchase links (separate with commas): ")

    characters = [x.strip() for x in characters.split(",") if x.strip()]
    purchase = [x.strip() for x in purchase.split(",") if x.strip()]

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO images (
                id, title, src, category, date, author,
                series_num, timeframe, brief_description,
                additional_info, next_id, prev_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            image_id, title, src, category, date, author,
            series_num, timeframe, brief_description,
            additional_info, next_id or None, prev_id or None
        ))

        for character in characters:
            cursor.execute("""
                INSERT INTO key_characters (image_id, character_name)
                VALUES (?, ?)
            """, (image_id, character))

        for link in purchase:
            cursor.execute("""
                INSERT INTO purchase_links (image_id, url)
                VALUES (?, ?)
            """, (image_id, link))

        conn.commit()
        print(f"\nSuccessfully added {title}!")

    except sqlite3.IntegrityError as error:
        conn.rollback()
        print(f"\nError adding image: {error}")

    finally:
        conn.close()


if __name__ == "__main__":
    add_image()
