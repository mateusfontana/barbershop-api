const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "gostack_gobarber",
  entities: [
    "./src/models/*.ts"
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  cli: {
    "migrationsDir": "./src/database/migrations"
  },
  namingStrategy: new SnakeNamingStrategy(),
}
