import {RequestHandler} from 'express'
const createHttpError = 'http-errors';
import Note from '../models/note'
import {assertIsDefined} from '../utils/assert';

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session;
  try {
    assertIsDefined(authenticatedUserId)
    const notes = await Note.find().exec()
    res.status(200).json(notes)
  } catch (err) {
   next(err);
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId).exec();
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
  try {
    const newNote = await Note.create({
      title, 
      text
    });

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
}