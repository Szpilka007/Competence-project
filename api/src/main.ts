import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log", "verbose"],
  });

  app.use(morgan("short"));

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 1000,
    })
  );

  app.use(
    slowDown({
      windowMs: 5 * 60 * 1000,
      delayAfter: 500,
      delayMs: 500,
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle("Competence project").setDescription("API documentation").setVersion("0.1").build()
  );
  SwaggerModule.setup("docs", app, document);
  await app.listen(process.env.API_PORT, "0.0.0.0", () => Logger.log("Api is listening"));
})();
