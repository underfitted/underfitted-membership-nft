from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from pathlib import Path
import random

# Source: https://venngage.com/blog/pastel-color-palettes/#1
COLOR_PALETTE_POOL = [
    ["edf2fb", "d7e3fc", "ccdbfd", "c1d3fe", "abc4ff"],
    ["d1d1d1", "e1dbd6", "e2e2e2", "f9f6f2", "ffffff"],
    ["ffc09f", "ffee93", "fcf5c7", "a0ced9", "adf7b6"],
    ["809bce", "95b8d1", "b8e0d2", "d6eadf", "eac4d5"],
    ["e8d1c5", "eddcd2", "fff1e6", "f0efeb", "eeddd3"],
    ["e8dff5", "fce1e4", "fcf4dd", "ddedea", "daeaf6"],
    ["d4afb9", "d1cfe2", "9cadce", "7ec4cf", "52b2cf"],
    ["d3ab9e", "eac9c1", "ebd8d0", "fffbff", "fefeff"],
    ["ffe5ec", "ffc2d1", "ffb3c6", "ff8fab", "fb6f92"],
    ["79addc", "ffc09f", "ffee93", "fcf5c7", "adf7b6"],
    ["ffffff", "84dcc6", "a5ffd6", "ffa69e", "ff686b"],
    ["61f4de", "65cbe9", "68b6ef", "6c8dfa", "6e78ff"],
    ["ff7477", "e69597", "ceb5b7", "b5d6d6", "9cf6f6"],
    ["f49097", "dfb2f4", "f5e960", "f2f5ff", "55d6c2"],
    ["e27396", "ea9ab2", "efcfe3", "eaf2d7", "b3dee2"],
    ["f55c7a", "f57c73", "f68c70", "f6ac69", "f6bc66"],
    ["f08080", "f4978e", "f8ad9d", "fbc4ab", "ffdab9"],
    ["cdb4db", "ffc8dd", "ffafcc", "bde0fe", "a2d2ff"],
    ["fdffb6", "caffbf", "9bf6ff", "a0c4ff", "ffc6ff"],
    ["a7bed3", "c6e2e9", "f1ffc4", "ffcaaf", "dab894"],
    ["70d6ff", "ff70a6", "ff9770", "ffd670", "e9ff70"],
]


def screenshot(driver, number, rotatey, rotatez, rotategrad, color1, color2, color3):
    page_path = Path("card/template/index.html")
    page_url = f'file://{page_path.resolve()}?number={number}&rotatey={rotatey}&rotatez={rotatez}&rotategrad={rotategrad}&color1={color1}&color2={color2}&color3={color3}'
    print(page_url)

    driver.get(page_url)

    element = driver.find_element_by_id("main-element")
    element.screenshot(f"card/images/{number:03d}.png")


def main():
    chrome_options = Options()
    chrome_options.add_argument('--start-maximized')
    driver = webdriver.Chrome(
        "card/script/driver/chromedriver", chrome_options=chrome_options)

    for i in range(0, 100):
        random.seed(i)

        rotatey = random.randint(-20, 20)
        rotatez = random.randint(-10, 10)
        rotategrad = random.randint(0, 359)

        palette = random.sample(COLOR_PALETTE_POOL, 1)[0]

        print(palette)
        random.shuffle(palette)

        screenshot(driver, i, rotatey, rotatez, rotategrad,
                   palette[0], palette[1], palette[2])

    driver.close()


if __name__ == '__main__':
    main()
