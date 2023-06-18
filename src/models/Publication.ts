import mongoose from 'mongoose'
import Publication from '@/types/publication'

export const publicationSchema = new mongoose.Schema<Publication>({
  name: { type: String, required: true },
  url: { type: String, required: true }
})

export default mongoose.models.Publication ||
  mongoose.model<Publication>('Publication', publicationSchema)
