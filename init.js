// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })

fs.mkdirSync('mongodb-data_tmp', { recursive: true })
