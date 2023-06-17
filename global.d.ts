import mongoose from 'mongoose'

declare global {
  var _mongoClientPromise: Promise<typeof mongoose>
}

export {}
