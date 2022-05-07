import fastify from "fastify";
import * as  fastifySwagger from '@fastify/swagger'
import * as fastifyCors from '@fastify/cors'
import { UserRoute } from './controller'
import { UserService } from './controller'
import { UserDomain, User } from './domain'
import { UserData } from './data'

const app = fastify({})
app.register(fastifyCors.default, {
  origin: true
})
app.register(fastifySwagger.default, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Test Mansa',
      description: 'Swagger for the technical test',
      version: '0.1.0'
    },
    host: '127.0.0.1:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' }
    ],
  },
  exposeRoute: true
})

const userData = new UserData()
const userDomain = new UserDomain({ userProvider: userData })
const userService = new UserService({ userDomain })

new UserRoute({ app, userService })

app.listen(3000, '127.0.0.1', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})