import {RequestHandler} from 'express'
import Note from '../models/note'

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await Note.find().exec()
    res.status(200).json(notes)
  } catch (err) {
   next(err);
  }

}

export const createNote: RequestHandler = async (req, res, next) => {
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