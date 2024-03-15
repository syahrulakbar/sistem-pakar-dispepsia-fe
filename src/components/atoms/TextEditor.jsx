import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./textEditor.css";

export default function TextEditor({ ...rest }) {
  const { label, value, setFieldValue } = rest;
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFieldValue(forFormik);
    setEditorState(editorState);
  };
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <Editor
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
