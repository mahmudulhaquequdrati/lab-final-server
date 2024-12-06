import mongoose from 'mongoose'

export const connectToDB = async () => {
  mongoose.set('strict', true)

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 0, // Minimum number of connections in the pool (Not directly available, so this just configures max connections)
      serverSelectionTimeoutMS: 60000, // Maximum time to acquire a connection (in milliseconds)
      socketTimeoutMS: 10000 // Maximum time a connection can be idle (in milliseconds)
    })
    console.log('Successfully connected to the database')
  } catch (error) {
    console.error({ error: `Failed to connect DB: ${error}` })
  }
}
