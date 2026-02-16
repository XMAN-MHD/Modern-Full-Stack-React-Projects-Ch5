import mongoose from 'mongoose'

export async function initDatabase() {
  const DATABASE_URL =
    process.env.DATABASE_URL || 'mongodb://localhost:27018/blog'

  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.info('✅ Successfully connected to database:', DATABASE_URL)
  } catch (err) {
    console.error('❌ Error connecting to database:', err)
    throw err
  }
}
