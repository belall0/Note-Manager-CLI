import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  getAllNotes,
  getMatchingNotes,
  insertNewNote,
  removeAllNotes,
  removeNote,
} from "./notes.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    yargs => {
      yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async argv => {
      // get notes and arguments
      const noteContent = argv.note;
      const tags = argv.tags?.split(",").map(tag => tag.trim());

      // insert them into db
      await insertNewNote(noteContent, tags);
    }
  )
  .command(
    "all",
    "get all notes",
    yargs => {},
    async argv => {
      // get all notes from db
      const notes = await getAllNotes();
      // display them
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    yargs => {
      yargs.positional("filter", {
        type: "string",
        description:
          "The search term to filter notes by, will be applied to note.content",
      });
    },
    async argv => {
      // get filter value
      const filterStr = argv.filter;
      // get matching notes
      const matchingNotes = await getMatchingNotes(filterStr);
      // display them
      listNotes(matchingNotes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    yargs => {
      yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async argv => {
      const id = argv.id;
      await removeNote(id);
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    yargs => {
      yargs.positional("port", {
        type: "number",
        default: 5000,
        describe: "port to bind on",
      });
    },
    async argv => {}
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async argv => {
      await removeAllNotes();
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to be added  to the note",
  })
  .demandCommand(1)
  .parse();
