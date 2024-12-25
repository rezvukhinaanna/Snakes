import sys
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import os

# Настройки TensorFlow
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Подавляем логи TensorFlow

# Список классов змей
classes = ['natrix', 'viper', 'smooth', 'random']
classes_rus = ['Уж', 'Гадюка', 'Медянка', 'На изображении нет змей']

# Абсолютный путь к файлу модели
MODEL_PATH = os.path.join(os.path.dirname(__file__), '2_model.h5')

# Проверка наличия модели перед загрузкой
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Модель не найдена по пути: {MODEL_PATH}")

# Загрузка модели
model = tf.keras.models.load_model(MODEL_PATH)


def predict_snake(img_path):
    try:
        # Проверка, существует ли файл изображения
        if not os.path.exists(img_path):
            return f"Ошибка: файл {img_path} не найден."

        # Открытие изображения
        img = Image.open(img_path)
        img = img.convert('RGB')
        img = img.resize((224, 224), Image.NEAREST)  # Преобразуем изображение
        img_array = np.array(img)
        img_array_expanded_dims = np.expand_dims(img_array, axis=0)
        final_image = tf.keras.applications.densenet.preprocess_input(img_array_expanded_dims)

        # Получение предсказания
        prediction = model.predict(final_image)
        pred = np.argmax(prediction)
        confidence = np.max(prediction) * 100  # Уверенность модели в %
        return f"{classes_rus[pred]} (уверенность: {confidence:.2f}%)"
    except Exception as e:
        return f"Ошибка обработки изображения: {e}"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Ошибка: путь к изображению не передан.")
        sys.exit(1)

    img_path = sys.argv[1]
    result = predict_snake(img_path)
    print(result)  # Выводим только название змеи на русском
