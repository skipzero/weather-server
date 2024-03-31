import {RequestHandler} from 'express'
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Note from '../models/note'
import {assertIsDefined} from '../utils/assert';

export const getNotes: RequestHandler = async (req, res, next) => {
  // const authenticatedUserId = req.session.userId;
  try {

    // assertIsDefined(authenticatedUserId)
    // const notes = await Note.find({userId: authenticatedUserId}).exec()
    // res.status(200).json(notes)
  } catch (err) {
   next(err);
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  // const authenticatedUserId = req.session.userId;
  
  try {
    // assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID')
    }
    const note = await Note.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, 'Note not found')
    }
    // if (!note.userId.equals(authenticatedUserId)) {
    //   throw createHttpError(401, 'You cannot access this note')
    // }

    res.status(200).json(note)
  } catch (err) {
    next(err);
  }
}

interface CreateNoteBody {
  title?: string,
  text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const {title, text, } = req.body;
  // const authenticatedUserId = req.session.userId;
  try {
    // assertIsDefined(authenticatedUserId)
    if (!title) {
      throw createHttpError(400, 'note must have title')
    }
    const newNote = await Note.create({
      title, 
      text
    });

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
}

interface UpdateNoteParams {
  noteId: string,
}

interface UpdateNoteBody {
  title?: string,
  text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  // const authenticatedUserId = req.session.userId;

  try {
    // assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id...')
    }

    if (!newTitle) {
      throw createHttpError(400, 'note must have a title...')
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found...')
    }

    // if (!note.userId.equals(authenticatedUserId)) {
    //   throw createHttpError(401, 'you cannot access this note...')
    // }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote)
  } catch (err) {
    next(err)
  }

};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.params.userId;

  try {
    assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note IP')
    }

    const note = await Note.findByIdAndDelete(noteId).exec()

    if (!note) {
      throw createHttpError(404, 'Note not found...')
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'you cannot access this note...')
    }

    res.sendStatus(204)

  } catch (err) {
    next(err)
  }
};