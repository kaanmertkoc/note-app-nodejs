const validator = require('validator/validator');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');
const { argv } = require('yargs');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note',
  handler: function () {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    notes.findNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: function () {
    notes.listNotes();
  },
});

yargs.parse();
