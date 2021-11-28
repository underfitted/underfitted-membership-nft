import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

TOTAL = 2000

TRAITS = {
    "skin": [0.2, 0.2, 0.2, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
    "shirt": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    "shirt-accessories": [0.5, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
    "headband": [0.8, 0.07, 0.06, 0.04, 0.03],
    "expression": [
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
    "hair": [0.4, 0.2, 0.15, 0.15, 0.10],
    "lineart": [1.0],
    "accessories": [0.4, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05],
}


def load_trait(name, trait):
    index = np.random.choice(np.arange(0, len(trait)), p=trait)
    image = Image.open(f"card/pfp/{name}/{index:02d}.png")
    return image, index


def create_doodle(index):
    properties = []

    background, index = load_trait("skin", TRAITS["skin"])
    properties.append(index)

    for name, trait in TRAITS.items():
        if name == "skin":
            continue

        foreground, index = load_trait(name, trait)
        background.paste(foreground, (0, 0), foreground)

        properties.append(index)

    filename = "".join(map(lambda x: f"{x:02d}", properties))
    background.save(f"card/images/pfp/{filename}.png")


def main():
    for i in range(TOTAL):
        create_doodle(i)


if __name__ == "__main__":
    main()
