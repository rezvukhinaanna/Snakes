from selenium import webdriver
from selenium.webdriver.common.by import By
import requests

browser = webdriver.Firefox()
i_page=1
for i_page in range(1, 2):

    page = f'https://www.istockphoto.com/ru/search/2/image?phraseprocessing=excludenaturallanguage&istockcollection=&mediatype=photography&phrase=%D0%BC%D0%B5%D0%B4%D1%8F%D0%BD%D0%BA%D0%B0%20%D0%B7%D0%BC%D0%B5%D1%8F&sort=best$={i_page}'
    browser.get(page)

    block = browser.find_element(By.CLASS_NAME, 'DE6jTiCmOG8IPNVbM7pJ')
    blocks = block.find_elements(By.CLASS_NAME, 'ABVClgVJTdOPXmIa63fN')

    for i, item in enumerate(blocks):
        pict = item.find_element(By.TAG_NAME, 'picture').find_element(By.TAG_NAME, 'img').get_attribute('src')
        img = requests.get(pict).content

        # Сохраняем изображение на диск
        with open(f'snake_data/smooth/{i+60*(i_page-1)}.jpg', 'wb') as img_file:
            img_file.write(img)
        print(f'Изображение {i+60*(i_page-1)}.jpg скачано')

