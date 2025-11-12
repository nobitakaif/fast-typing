import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Change this url for production 
    url:"postgresql://postgres:mypassword@localhost:5432/mydb" 
  },
});
