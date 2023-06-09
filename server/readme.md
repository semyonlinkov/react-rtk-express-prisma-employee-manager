express --no-view (команда создает express приложение, без html, с помощью пакета express-generator)

//! настройка prism'ы
npx prisma init --datasource-provider sqlite

//! Создать миграцию
npx prisma migrate dev --name init

//! UI для работы с БД (http://localhost:5555/)
npx prisma studio