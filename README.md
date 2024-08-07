# AltPasteBin

Приложение по мотивам некогда популярного сервиса для обмена фрагментами текстовых данных

## Содержание

- [Технологии](#технологии)
- [Особенности](#особенности)
- [Установка, настройка и запуск](#установка-настройка-и-запуск)
  - [Требования](#требования)
  - [Инсталяция](#инсталяция)
  - [Настройка](#настройка)
  - [Запуск Development сервера](#запуск-development-сервера)
  - [Создание билда](#создание-билда)
- [Тестирование](#тестирование)

## Технологии

- Next.js
- React
- TypeScript
- Mongoose
- Formik
- Monaco Editor
- Jest

## Особенности

- Лаконичный дизайн: Простой и удобный интерфейс для быстрого доступа к основным функциям.
- Поддержка тем: Возможность переключения между тремя видами тем: светлая, темная и голубая.
- Подсветка синтаксиса: Используется подсветка синтаксиса, аналогичная дефолтной в VSCode.
- Доступность: Много внимания уделено обеспечению доступности для людей с ограниченными возможностями.
- Встроенная капча: Использование математической капчи для защиты от спама и ботов.
- Управление приватностью: Возможность создавать как публичные, так и приватные сниппеты.
- Комментарии: Пользователи могут оставлять комментарии к сниппетам, что способствует активному обсуждению и улучшению кода.
- Адаптивный дизайн: Обеспечивает возможность на любом устройстве с браузером.
- Тесты: На данном этапе есть покрытие юниттестами.

## Установка, настройка и запуск

### Требования

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v20+.

### Инсталяция

Клонируйте репозиторий:

```sh
$ git clone https://github.com/spammm/pastebin.git
cd pastebin
```

Установите зависимости:

```sh
npm install
```

### Настройка

Для локального закпуска необходимо создать файл .env.local в корне проекта
и прописать в нем MONGODB_URI вашей базы mongodb.
Пример формата строки:
MONGODB_URI=mongodb+srv://<username>:<password>@pastebin.xxx.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=PasteBin
Можно создать свою базу например на [cloud.mongodb.com](https://cloud.mongodb.com/)

### Запуск Development сервера

Запустите проект:

```sh
npm run dev
```

## Создание билда

Чтобы выполнить production сборку, выполните команду:

```sh
npm run build
```

## Тестирование

Для запуска юнит тестов выполнить команду:

```sh
npm run test
```
demo [pastebin.nickdev.ru](https://pastebin.nickdev.ru/)
