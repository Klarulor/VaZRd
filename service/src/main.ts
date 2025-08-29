import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app.module"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import compression from "@fastify/compress"
import helmet from "@fastify/helmet"
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common"
import { useContainer } from "class-validator"
import fastifyMultipart from "@fastify/multipart"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import fastifyCookie from "@fastify/cookie"

const logger = new Logger("Bootstrap")
const PORT = process.env.PORT ?? 7001

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        trustProxy: true
      })
  )

  // @ts-expect-error
  await app.register(compression)
  // @ts-expect-error
  await app.register(helmet, {
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
  // @ts-expect-error
  await app.register(fastifyCookie, {
    secret: "XXXX" // TODO: replace with actual secret
  })
  app.enableCors({
    origin: "*"
  })

  // @ts-expect-error конфликтующая поебота
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10000,
      fieldNameSize: 100,
      fields: 10,
      fieldSize: 100,
      files: 5
    },
    attachFieldsToBody: true
  })

  app.setGlobalPrefix("api")
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        validateCustomDecorators: false
      })
  )

  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI
  })

  app.enableShutdownHooks()
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = new DocumentBuilder().setTitle("Cats example").setDescription("The cats API description").setVersion("1.0").addTag("cats").build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)

  await app.listen(PORT, "0.0.0.0")
}

try {
  ;(async () => {
    await bootstrap()
  })().catch((error: unknown) => {
    logger.error("Error during bootstrap:", error)
    throw error
  })
  logger.log(`Application is running on: http://localhost:${PORT}/api`)
  logger.log(`Swagger is running on: http://localhost:${PORT}/api/docs`)
} catch (error) {
  logger.error(error)
}
