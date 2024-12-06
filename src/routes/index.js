import { Router } from 'express'
import { expressMiddleware } from '@apollo/server/express4'
// GraphQL Server
import { GQLServer } from 'src/graphql/gqlServer'
import { userRouter } from 'src/modules/routers'
import { authorizer } from 'src/midllewares/authorizer'
import { uploadFileToStorage } from 'src/utils/aws/simple-storage-service'
import multer from 'multer'

const router = Router()
// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() })
// GraphQL Routes

GQLServer.start().then(() =>
  router.use(
    '/graphql',
    authorizer(),
    expressMiddleware(GQLServer, {
      context: ({ req }) => {
        console.log('=== Request started body =>')

        return { user: req?.user || {} }
      }
    })
  )
)

router.use('/auth', userRouter)
router.post('/upload/file', upload.single('file'), uploadFileToStorage)

export default router
