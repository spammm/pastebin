import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface CommentType {
  id: string;
  snippetId: string;
  author: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentTypeDocument
  extends Omit<CommentType, 'id' | 'snippetId'>,
    Document {
  snippetId: Types.ObjectId;
  _id: Types.ObjectId;
}

const commentSchema = new Schema<CommentTypeDocument>(
  {
    snippetId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet',
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment: Model<CommentTypeDocument> =
  mongoose.models.Comment ||
  mongoose.model<CommentTypeDocument>('Comment', commentSchema);

export default Comment;
