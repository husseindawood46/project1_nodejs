import noteModel from "../model/noteModle.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel
      .find({}, { __v: 0 })
      .populate("user", { name: 1, email: 1 });
    res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: error.message });
  }
};
export const addNote = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const note = await noteModel.create({
      title,
      description,
      user,
    });
    res.json({ note });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: error.message });
  }
};
export const updateNote = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const { id } = req.params;
    const note = await noteModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        user,
      },
      {
        new: true,
      }
    );
    res.json({ note });
  } catch (error) {
    console.error("Error update user:", error);
    res.status(500).json({ error: error.message });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const { id } = req.params;
    const note = await noteModel.findByIdAndDelete(id, {
      title,
      description,
      user,
    });
    res.json({ note });
  } catch (error) {
    console.error("Error delete note:", error);
    res.status(500).json({ error: error.message });
  }
};
