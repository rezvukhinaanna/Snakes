from selenium import webdriver
from selenium.webdriver.common.by import By
import requests

browser = webdriver.Firefox()
i_page = 1
for i_page in range(1, 2):

    page = f'https://sotni.ru/kartinki-gyurzy/'
    browser.get(page)

    block = browser.find_element(By.XPATH, '//*[@id="gallery-1"]')
    blocks = block.find_elements(By.TAG_NAME, 'figure')

    for i, item in enumerate(blocks):
        try:
            pict = item.find_element(By.TAG_NAME, 'a').get_attribute('href')
            img = requests.get(pict).content

            # Сохраняем изображение на диск
            with open(f'snake_data/smooth//{i + 136}.jpg', 'wb') as img_file:
                img_file.write(img)
            print(f'Изображение {136+i}.jpg скачано')
        except:
            print('Aнлак')

