
from database import get_db

def show_images(conn):
    images = conn.execute(
        "SELECT id, title, category, author FROM images"
    ).fetchall()

    for image in images:
        print(f"\nID: {image['id']}")
        print(f"Title: {image['title']}")
        print(f"Category: {image['category']}")
        print(f"Author: {image['author']}")

def view_image(conn):
    image_id = input("Enter image ID: ")

    image = conn.execute(
        "SELECT * FROM images WHERE id = ?", (image_id,)
    ).fetchone()

    if not image:
        print("Image not found.")
        return

    for key in image.keys():
        print(f"{key}: {image[key]}")

    characters = conn.execute(
        "SELECT character_name FROM key_characters WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    links = conn.execute(
        "SELECT url FROM purchase_links WHERE image_id = ?",
        (image_id,)
    ).fetchall()

    print("Characters:", [row["character_name"] for row in characters])
    print("Purchase links:", [row["url"] for row in links])

def update_image(conn):
    image_id = input("Enter image ID to update: ")

    image = conn.execute(
        "SELECT * FROM images WHERE id = ?", (image_id,)
    ).fetchone()

    if not image:
        print("Image not found.")
        return

    print("\nLeave a field blank to keep its current value.")

    fields = [
        "title", "src", "category", "date", "author",
        "series_num", "timeframe", "brief_description",
        "additional_info", "next_id", "prev_id"
    ]

    updates = {}

    for field in fields:
        current = image[field]
        value = input(f"{field} [{current}]: ")

        if value:
            updates[field] = value

    if updates:
        assignments = ", ".join(f"{field} = ?" for field in updates)
        values = list(updates.values()) + [image_id]

        conn.execute(
            f"UPDATE images SET {assignments} WHERE id = ?",
            values
        )
        conn.commit()
        print("Image updated successfully.")
    else:
        print("No changes made.")

def delete_image(conn):
    image_id = input("Enter image ID to delete: ")

    image = conn.execute(
        "SELECT title FROM images WHERE id = ?", (image_id,)
    ).fetchone()

    if not image:
        print("Image not found.")
        return

    confirm = input(f"Delete '{image['title']}'? (y/n): ")

    if confirm.lower() == "y":
        conn.execute("DELETE FROM key_characters WHERE image_id = ?", (image_id,))
        conn.execute("DELETE FROM purchase_links WHERE image_id = ?", (image_id,))
        conn.execute("DELETE FROM images WHERE id = ?", (image_id,))
        conn.commit()
        print("Image deleted.")
    else:
        print("Deletion cancelled.")

def main():
    conn = get_db()

    while True:
        print("\n===== DATABASE EDITOR =====")
        print("1. View all images")
        print("2. View image details")
        print("3. Update image")
        print("4. Delete image")
        print("5. Exit")

        choice = input("\nChoose an option: ")

        if choice == "1":
            show_images(conn)
        elif choice == "2":
            view_image(conn)
        elif choice == "3":
            update_image(conn)
        elif choice == "4":
            delete_image(conn)
        elif choice == "5":
            break
        else:
            print("Invalid option.")

    conn.close()

if __name__ == "__main__":
    main()
