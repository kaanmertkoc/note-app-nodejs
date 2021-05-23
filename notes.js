const fs = require('fs');

const getNotes = function () {
  console.log('Your notes...');
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log('new note added');
  } else {
    console.log('Duplicate note found.');
  }
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = function (title) {
  const notes = loadNotes();
  const removedNotes = notes.filter(function (note) {
    return note.title !== title;
  });
  if (notes.length > removedNotes.length) {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(removedNotes);
  } else {
    console.log(chalk.red.inverse('Nothing is removed'));
  }
};

const listNotes = function () {
  const notes = loadNotes();
  notes.forEach(note => console.log(note.title));
};

const findNote = function (title) {
  const notes = loadNotes();
  const desiredNote = notes.find(note => note.title === title);
  if (desiredNote !== undefined) {
    console.log(desiredNote.title, desiredNote.body);
  } else {
    console.log("Your note couldn't be found.");
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  findNote,
};
