
import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { ENV } from "@org/shared";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: ENV.DATABASE_URL_MONGODB,
  },
});
