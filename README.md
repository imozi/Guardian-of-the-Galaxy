# Учебный командный проект (ремейк игры [Galaxian](https://en.wikipedia.org/wiki/Galaxian))

![Guardian of the Galaxy - Front Page](https://user-images.githubusercontent.com/29326762/215745569-0d828deb-ffa9-4844-868e-faa37f9b9ee2.png)

![Guardian of the Galaxy - Game Page](https://user-images.githubusercontent.com/29326762/215745611-67c20a1c-e649-4bf0-ae15-fe7eece1b6ad.png)


## Используемый стек технологий

> JavaScript-библиотека - [ReactJS](https://reactjs.org/)

> ЯП - [Typescript](https://www.typescriptlang.org/)

> Стейт-менеджер [Redux](https://redux.js.org/) - набор инструментов [Redux Toolkit](https://redux-toolkit.js.org/)

> REST API форума и лидерборда, в качестве сервера используется - [Express](https://expressjs.com/) в качестве базы данных - [Postgres](https://www.postgresql.org/)

> Сборщик проекта - [Vite](https://vitejs.dev/) (настроен - [SSR](https://vitejs.dev/guide/ssr.html))

> Пакетный менеджер - [Yarn](https://yarnpkg.com/) , используется `monorepo` на основе - [`lerna`](https://github.com/lerna/lerna)

> Инструмент тестирования - [Jest](https://jestjs.io/)

> Статический анализ кода JS/TS Eslint - [Eslint](https://www.typescriptlang.org/)

> Инструмент для автоформатирования кода - [Prettier](https://prettier.io/)

> Используется пре-комит с помощью [lefthook](https://github.com/evilmartians/lefthook) (Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :))

> Используется контеризация - [Docker](https://www.docker.com/)

## Описание основных команд проекта

`yarn bootstrap` - установка всех зависимостей

`yarn dev` - запускает проект в режиме разработки

`yarn dev:client` - запускает только клиент в режиме разработки

`yarn dev:server` - запускает только сервер в режиме разработки (контейнер с базой предварительно данных должен быть запущен)

`yarn build` - запускает сборку проекта клиента и сервера

`yarn build:client` - запускает сборку только клиента

`yarn build:server` - запускает сборку только сервера

`yarn serve` - запускает проекта в режиме продакшена (предварительно нужно сделать `yarn build`)

### Добавление зависимостей

```yarn lerna add {your_dep} --scope client``` - Чтобы добавить зависимость для клиента

```yarn lerna add {your_dep} --scope server``` - Чтобы добавить зависимость для сервера

```yarn lerna add {your_dep}``` - Чтобы добавить зависимость и для клиента и для сервера

```yarn lerna add {your_dep} -D --scope={client || server}``` - Чтобы добавить dev зависимость, проделайте то же самое, но с флагом `dev`

``` yarn lerna exec --scope={client || server} yarn remove {your_dep}``` - Чтобы удалить зависимость

### Тесты

```yarn test``` - запускает тесты для клиента

### Линтинг

```yarn lint``` - анализирует код на ошибки

### Форматирование prettier

```yarn format``` - форматирует код

### Как правильно писать коммиты?

Можно почитать в соответствующей разделе [документации](docs/README.md)

## Запуск проекта в режиме development

**Должен быть установлен `nodejs >= v16` и `docker` (docker должен быть запущен)**

    git clone https://github.com/imozi/Guardian-of-the-Galaxy.git
    
    cd Guardian-of-the-Galaxy
    
    yarn bootstrap - (это обязательный шаг, без него ничего работать не будет)
    
    Скопируйте и переименуйте файл .env.sample в .env в корне проекта
    
    docker compose -f docker-compose.dev.yml up -d или docker-compose -f docker-compose.dev.yml up -d (в зависимости на какой OS запускаете)
    
    yarn dev

1. Клонирует репозиторий

2. Переходит в папку с проектом

3. Устанавливает зависимости
4. Необходимое действие для получения переменных сред сервисами

5. Запускает контейнер базы данных

6. Запускает проект в режиме разработки (эта команда запустит клиент с SSR адресу - http://localhost:3000 и сервер API по адресу - http://localhost:3001 )

## Запуск проекта в режиме production

**Должен быть установлен `nodejs >= v16` и `docker` (docker должен быть запущен)**

    git clone https://github.com/imozi/Guardian-of-the-Galaxy.git
    
    cd Guardian-of-the-Galaxy
    
    yarn bootstrap - (это обязательный шаг, без него ничего работать не будет)
    
    Скопируйте и переименуйте файл .env.sample в .env в корне проекта
    
    docker compose -f docker-compose.dev.yml up -d или docker-compose -f docker-compose.dev.yml up -d (в зависимости на какой OS запускаете)
    
    yarn build
    
    yarn serve

1. Клонирует репозиторий

2. Переходит в папку с проектом

3. Устанавливает зависимости
4. Необходимое действие для получения переменных сред сервисами

5. Запускает контейнер базы данных

6. Запускает билд проекта

7. Запускает проект в режиме продакшн (эта команда запустит клиент с SSR адресу - http://localhost:3000 и сервер API по адресу - http://localhost:3001 )

## Запуск проекта в режиме production в окружение в Docker

> TODO: Дописать описание

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)

Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)

В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот