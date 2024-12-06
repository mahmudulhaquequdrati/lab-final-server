import userMutation from 'src/graphql/resolvers/user/user.mutation'
import orderMutation from 'src/graphql/resolvers/order/order.mutation'
import userQuery from 'src/graphql/resolvers/user/user.query'
import orderQuery from 'src/graphql/resolvers/order/order.query'
import messageRequestsQuery from 'src/graphql/resolvers/message-requests/messageRequests.query'
import messageRequestsMutation from 'src/graphql/resolvers/message-requests/messageRequests.mutation'
import recurringOrderQuery from 'src/graphql/resolvers/recurring-order/recurringOrder.query'
import recurringOrderMutation from 'src/graphql/resolvers/recurring-order/recurringOrder.mutation'
import reviewMutation from 'src/graphql/resolvers/review/review.mutation'
import reviewQuery from 'src/graphql/resolvers/review/review.query'

// import scalarTypes from 'src/graphql/resolvers/common/scalar'

export default {
  Mutation: {
    ...userMutation,
    ...orderMutation,
    ...messageRequestsMutation,
    ...recurringOrderMutation,
    ...reviewMutation
  },
  Query: {
    ...userQuery,
    ...orderQuery,
    ...messageRequestsQuery,
    ...recurringOrderQuery,
    ...reviewQuery
  }
  // ...scalarTypes
}
