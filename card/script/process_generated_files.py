import os
import json
from pathlib import Path

with open('card/pfp/metadata.json') as metadata_file:
    doodles_metadata = json.load(metadata_file)

for image in Path("card/images").glob("*.png"):
    print(image.name)

    # Parse name
    number = int(image.name.split("-")[0])
    doodle = image.name.split("-")[1][:-4]

    # Create metadata
    metadata = dict()
    metadata["name"] = f"Founding Membership #{number}"
    metadata["description"] = "Underfitted Social Club is a decentralized community working to make machine learning accessible to everyone. This token represents a commemorative founding membership and serves as the key to the community backstage."
    metadata["image"] = f"{number}.png"
    metadata["attributes"] = doodles_metadata[doodle]
    with open(f"card/metadata/{number}", "w") as metadata_file:
        json.dump(metadata, metadata_file)

    # Rename image
    os.rename(image, f"card/images/{number}.png")
