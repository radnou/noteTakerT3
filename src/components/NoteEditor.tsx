import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useEffect, useState } from "react";
import { noteRouter } from "y/server/api/routers/note";
import { boolean } from "zod";

export const NoteEditor = ({
  editMode,
  note,
  action,
}: {
  editMode: boolean;
  note: {
    id?: string;
    title: string;
    content: string;
    topic?: string;
  };
  action: (note: {
    id?: string;
    title: string;
    content: string;
    topic?: string;
  }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [noteId, setNoteId] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  useEffect(() => {
    if (note) {
      setCode(note.content);
      setTitle(note.title);
      setNoteId(note.id || "");
      setTopic(note.topic || "");
    }
  }, [note]);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <h2>{editMode ? "Edit Note" : "Create New Note"}</h2>
          <input
            type="text"
            placeholder="Note Title"
            className={"input-primary input input-lg w-full font-bold"}
            // value={title}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <CodeMirror
          value={code}
          width="50%"
          height="31vh"
          minWidth="25%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="rounded-md border border-gray-300 shadow-md"
        />
      </div>
      <div className="card-actions justify-end pb-5 pr-8">
        <button
          onClick={() => {
            setCode("");
            setTitle("");
            action({
              id: noteId,
              title,
              content: code,
              topic,
            });
          }}
          className="btn-primary btn"
          // disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          {editMode ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};
