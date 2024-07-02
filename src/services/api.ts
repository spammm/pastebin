'use server';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';
import { connectToMongoDB } from '@/lib/mongo';
import Snippet, { SnippetType } from '@/entities/Snippet/model';
import Comment, {
  CommentType,
  CommentTypeDocument,
} from '@/entities/Comment/model';

interface CommentTypeResponse {
  id: string;
  snippetId: string;
  author: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createSnippet(
  snippet: Omit<SnippetType, 'id' | 'shortUrl'>
): Promise<SnippetType> {
  await connectToMongoDB();
  const shortUrl = nanoid(6);
  try {
    const newSnippet = await Snippet.create({
      shortUrl,
      ...snippet,
    });
    const newSnippetObj = newSnippet.toObject() as SnippetType;
    revalidatePath('/');
    return newSnippetObj;
  } catch (error) {
    console.log(error);
    throw new Error('Database Error');
  }
}

export async function fetchSnippetByShortUrl(
  url: string
): Promise<SnippetType | null> {
  await connectToMongoDB();
  try {
    const snippet = (await Snippet.findOne({
      shortUrl: url,
    }).lean()) as SnippetType;
    return snippet;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}

export async function fetchSnippets(
  page: number = 0,
  limit: number = 10
): Promise<SnippetType[]> {
  await connectToMongoDB();
  const snippets = await Snippet.find({ isPrivate: false })
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .lean()
    .exec();

  return snippets.map((snippet) => ({
    id: snippet._id.toString(),
    isPrivate: snippet.isPrivate,
    shortUrl: snippet.shortUrl,
    author: snippet.author,
    description: snippet.description,
    code: snippet.code,
    language: snippet.language,
    createdAt: snippet.createdAt,
    updatedAt: snippet.updatedAt,
  }));
}

export async function fetchComments(snippetId: string): Promise<CommentType[]> {
  await connectToMongoDB();
  try {
    const comments = await Comment.find({ snippetId })
      .sort({ createdAt: -1 })
      .lean();
    return comments.map((comment) => ({
      id: comment._id.toString(),
      snippetId: comment.snippetId.toString(),
      author: comment.author,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}

export async function createComment(
  snippetId: string,
  author: string,
  content: string
): Promise<CommentType> {
  await connectToMongoDB();
  try {
    const newComment = (await Comment.create({
      snippetId: new mongoose.Types.ObjectId(snippetId),
      author,
      content,
    })) as CommentTypeDocument;

    return {
      id: newComment._id.toString(),
      snippetId: newComment.snippetId.toString(),
      author: newComment.author,
      content: newComment.content,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}
