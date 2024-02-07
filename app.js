import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres';
import 'dotenv/config'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: "*"
})

fastify.register(fastifyPostgres, {
  connectionString: process.env.pg
})


fastify.get('/product', function (req, reply) {
  fastify.pg.query(
    'SELECT * from product',
    function onResult(err, result) {
      reply.send(err || result.rows)
    }
  )
})

fastify.get('/user', function (req, reply) {
  fastify.pg.query(
    'SELECT * from user_location WHERE ID=1',
    function onResult(err, result) {
      reply.send(err || result.rows)
    }
  )
})

fastify.get('/terms', function (req, reply) {
  fastify.pg.query(
    'SELECT * from terms',
    function onResult(err, result) {
      reply.send(err || result.rows)
    }
  )
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
