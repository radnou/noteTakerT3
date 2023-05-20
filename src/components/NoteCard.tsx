import { RouterOutputs } from "y/utils/api";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

//retrieve the type of the data we get from the api
type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  // isExpanded is a boolean that determines whether the note is expanded or not
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={"card mt-5 border-gray-200 bg-base-100 shadow-xl"}>
      <div className={"card-body m-0 pt-3"}>
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={"collapse-title text-xl font-bold"}>{note.title}</div>
          <div className={"collapse-content"}>
            <article className={"prose lg:prose-xl"}>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className={"flex-justify-end card-actions mx-2"}>
          <button className={"btn-warning btn-xs btn px-5"} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
