import mongoose, { Document, Model, Schema } from 'mongoose';

export interface SnippetType {
  [x: string]: any;
  id: string;
  isPrivate: boolean;
  shortUrl: string;
  author: string;
  description: string;
  code: string;
  language: string;
}

export interface SnippetTypeDocument extends Omit<SnippetType, 'id'>, Document {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
}

const snippetSchema = new Schema<SnippetTypeDocument>(
  {
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      default: 'John Doe',
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Snippet: Model<SnippetTypeDocument> =
  mongoose.models.Snippet ||
  mongoose.model<SnippetTypeDocument>('Snippet', snippetSchema);

export default Snippet;
