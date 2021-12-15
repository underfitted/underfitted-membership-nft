import json
from pathlib import Path

images_base_uri = "ipfs://QmPqS9sCmVUKpZiqi1nX7x4f5UNYRrV6fCAxNssWMf4grS/"


def main():
    for image in Path("card/metadata").glob("*"):
        if image.name == ".empty":
            continue

        print(image.name)

        with open(image, "r") as metadata_file:
            metadata = json.load(metadata_file)
            metadata["image"] = f"{images_base_uri}{Path(metadata['image']).name}"

        with open(image, "w") as metadata_file:
            json.dump(metadata, metadata_file)


if __name__ == "__main__":
    main()
