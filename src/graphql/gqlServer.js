import { ApolloServer } from '@apollo/server'
import { unwrapResolverError } from '@apollo/server/errors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import resolvers from 'src/graphql/resolvers'
import typeDefs from 'src/graphql/schema'

const schema = makeExecutableSchema({ resolvers, typeDefs })

const GQLServer = new ApolloServer({
  formatError: (formattedError, error) => {
    const originalError = unwrapResolverError(error)
    const exception = typeof originalError === 'object' ? originalError : null

    if (exception.length) {
      console.log('=== Exception Error ===', JSON.stringify(exception))
      return {
        message: exception.message || error?.message || 'INTERNAL SERVER ERROR',
        statusCode: exception.statusCode || 500
      }
    }

    return formattedError
  },
  introspection: process.env.ENVIRONMENT !== 'production', // !!process.env.IS_OFFLINE
  schema
})

const startWSServer = (server) =>
  useServer(
    {
      context: async (ctx) => {
        console.log('=== Request started for subscription, connectionParams =>', ctx?.connectionParams)

        return { user: ctx }
      },
      execute,
      schema,
      subscribe
    },
    new WebSocketServer({
      server,
      path: '/graphql'
    })
  )

export { GQLServer, startWSServer }
