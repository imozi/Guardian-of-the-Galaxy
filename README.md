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

`yarn lerna add {your_dep} --scope client` - Чтобы добавить зависимость для клиента

`yarn lerna add {your_dep} --scope server` - Чтобы добавить зависимость для сервера

`yarn lerna add {your_dep}` - Чтобы добавить зависимость и для клиента и для сервера

`yarn lerna add {your_dep} -D --scope={client || server}` - Чтобы добавить dev зависимость, проделайте то же самое, но с флагом `dev`

` yarn lerna exec --scope={client || server} yarn remove {your_dep}` - Чтобы удалить зависимость

### Тесты

`yarn test` - запускает тесты для клиента

### Линтинг

`yarn lint` - анализирует код на ошибки

### Форматирование prettier

`yarn format` - форматирует код

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

## Запуск проекта в режиме production в окружение в Docker на сервере

**Должен быть установлен `docker` (docker должен быть запущен)**
**У вас должен быть зарегистрирован домен**

    git clone https://github.com/imozi/Guardian-of-the-Galaxy.git
    
    cd Guardian-of-the-Galaxy

    Скопируйте и переименуйте файл app.simple.conf в app.conf в корне проекта
    Так же измените в app.conf во всех местах где есть example.com на свой домен

    Скопируйте и переименуйте файл init-proxy-ssl-and-start.example.sh в init-proxy-ssl-and-start.sh в корне проекта
    Так же измените в init-proxy-ssl-and-start.sh переменной domains - свой домен, email - свою почту
    
    Скопируйте и переименуйте файл .env.sample в .env в корне проекта
    Так же измените перменные в .env: VITE_MAIN_DOMAIN и MAIN_DOMAIN на ваш домен

    chmod +x ./init-proxy-ssl-and-start.sh

    ./init-proxy-ssl-and-start.sh 
    

1. Клонирует репозиторий

2. Переходит в папку с проектом

3. Необходимое действие для правильного разворота Nginx Proxy

4. Необходимое действие для правильного разворота проекта

5. Необходимое действие для получения переменных сред сервисами

6. Делает файл исполняемым

7. Запускает билд проекта в окружении докера

8. После билда сервис будет доступен по адрессу вашего домена


## Анализ утечек памяти

1. Запуск игры

Видим большой рост потребления памяти и создания нод
После инициализации приходят в норму

![Запуск игры](https://user-images.githubusercontent.com/40211507/219857875-95e8aed1-5399-42f2-9eca-0abe6a31fd6f.png)

2. Игра

При уничтожении количество нод уменьшается
Повторный рост нод происходит в связи началом атаки врагов

![Игра1](https://user-images.githubusercontent.com/40211507/219859626-4b172998-0a40-40f6-a777-7aa2f2521da0.png)
![Игра2](https://user-images.githubusercontent.com/40211507/219858084-1ccc3daf-5c39-49b5-85e7-73d8f602c0cd.png)
