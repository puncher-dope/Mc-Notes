# Task Manager (React + Ant Design)

Простое приложение для управления задачами с Markdown-редактором.

## 📌 Основные возможности

- Просмотр списка задач
- Создание, редактирование и удаление задач
- Поддержка Markdown в содержимом задач
- Поиск по задачам
- Оффлайн-работа через Service Worker
- Адаптивный интерфейс

## 🛠 Технологии

- **Frontend**:
  - React
  - TypeScript
  - Ant Design (UI компоненты)
  - React Markdown
- **Backend**:
  - Node.js/Express
  - MongoDB (для хранения задач)

## 🚀 Установка и запуск

1. **Клонировать репозиторий**

   ```bash
   git clone https://github.com/puncher-dope/Mc-Notes.git
   cd task-manager

   ```

2. **Установить зависимости**
   npm install

3. **Запустить фронтенд**

npm start

4. **Запустить бэкенд**
   cd server
   npm install
   npm start

**Структура проекта**
NOTESMCBOOK/
├── backend/                  # Серверная часть
│   ├── controllers/          # Контроллеры бизнес-логики
│   │   ├── task.js          # Контроллер задач
│   │   ├── user.js          # Контроллер пользователей
│   │   └── helpers/         # Вспомогательные функции
│   │       ├── mapTask.js   # Маппинг данных задач
│   │       ├── mapUser.js   # Маппинг данных пользователей
│   │       └── token.js     # Работа с токенами
│   ├── middlewares/          # Промежуточное ПО
│   │   └── authenticated.js # Middleware аутентификации
│   ├── models/              # Модели данных
│   │   ├── Task.js          # Модель задачи (Mongoose/Schema)
│   │   └── User.js          # Модель пользователя
│   ├── routes/              # Маршруты API
│   │   ├── env              # Файл окружения (должен быть .env)
│   │   ├── gitignore        # Игнорируемые файлы (опечатка, должен быть .gitignore)
│   │   ├── app.js           # Основной файл приложения (Express)
│   │   ├── package-lock.json
│   │   └── package.json
│   └── node_modules/        # Зависимости сервера
│
└── frontend/                # Клиентская часть
    ├── assets/              # Статические ресурсы
    ├── js/                  # JavaScript-файлы (настройка sw)
    ├── public/              # Публичные файлы
    ├── src/                 # Исходный код
    │   ├── app/             # Ядро приложения
    │   ├── provider/        # Провайдеры контекста
    │   ├── routes/          # Маршрутизация
    │   ├── index.css        # Глобальные стили
    │   └── index.tsx        # Точка входа
    ├── entities/            # Бизнес-сущности
    │   └── ui/
    │       |── task-card/   # Компонент карточки задачи
    ├── features/            # Функциональные модули
    │   ├── ui/              # UI-компоненты
    │   └── index.ts         # Экспорт модулей
    ├── pages/               # Страницы приложения
    │   ├── auth-page/       # Страница авторизации
    │   ├── model/           # Модели данных (дублирование с backend?)
    │   ├── not-found-page/  # 404 страница
    │   ├── register-page/   # Страница регистрации
    │   ├── todo-list-page/  # Страница с задачами
    │   └── index.ts         # Экспорт страниц
    ├── shared/              # Общие ресурсы
        ├── api/             # API-клиент
        ├── ui/              # Общие UI-компоненты
        ├── utils/           # Утилиты
        └── index.ts         # Экспорт
