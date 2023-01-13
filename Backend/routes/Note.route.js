const express = require("express");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const { NoteModel } = require("../model/Note.model");
// const { NoteModel } = require("../model/Note.model")
const noteRouter = express.Router();
noteRouter.use(express.json());
noteRouter.use("/", authenticate);
noteRouter.get("/", async (req, res) => {
let notes=await NoteModel.find()
  res.send(notes);
});
noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = NoteModel(payload);
    await new_note.save();
    res.send("Create Succesfully");
  } catch (err) {
    res.send("something went wrong");
  }
});
noteRouter.patch("/update:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const note=await NoteModel.findOne({_id:id})
  const userID_in_note=note.userID

const userID_in_making_req=req.body.userID

  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, data);
    res.end("Note Update Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});


noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.deleteOne({ _id: id });
    res.end("Note Delete Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
module.exports = { noteRouter };
