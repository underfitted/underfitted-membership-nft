import os
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont

TOTAL = 2000

TRAITS = {
    "Skin": [0.2, 0.2, 0.2, 0.10, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
    "Shirt": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    "Shirt Accessories": [0.5, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
    "Headband": [0.8, 0.07, 0.06, 0.04, 0.03],
    "Expression": [
        0.15,
        0.15,
        0.15,
        0.10,
        0.10,
        0.10,
        0.05,
        0.05,
        0.05,
        0.05,
        0.02,
        0.02,
        0.01,
    ],
    "Hair": [0.4, 0.2, 0.15, 0.15, 0.10],
    "lineart": [1.0],
    "Accessories": [0.4, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05],
}

def load_png_files_from_directory(directory):
    files = []
    for filename in sorted(os.listdir(directory)):
        if filename.endswith(".png"):
            files.append(filename)

    return files


def load_trait(name):
    files = load_png_files_from_directory(f"card/traits/{name}")
    filename = np.random.choice(files, p=TRAITS[name])
    image = Image.open(f"card/traits/{name}/{filename}")
    return image, filename


def create_doodle(index):
    properties = []

    background, filename = load_trait("Skin")
    properties.append(filename)

    for name, trait in TRAITS.items():
        if name == "Skin":
            continue

        foreground, filename = load_trait(name)
        background.paste(foreground, (0, 0), foreground)

        properties.append(filename)

    doodle = "".join(map(lambda x: f"{x[0:2]}", properties))
    background.save(f"card/pfp/{doodle}.png")

    return doodle, properties


def main():
    metadata = {}

    for doodle_number in range(TOTAL):
        doodle, properties = create_doodle(doodle_number)

        metadata[doodle] = []
        for index, trait in enumerate(TRAITS.keys()):
            if trait == "lineart":
                continue

            value = properties[index][5:-4]
            metadata[doodle].append({"trait_type": trait, "value": value})
        
    with open("card/pfp/metadata.json", "w") as f:
        f.write(json.dumps(metadata))


if __name__ == "__main__":
    main()
