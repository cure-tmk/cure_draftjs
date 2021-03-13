import styled from '@emotion/styled'
import { Editor as DraftJSEditor, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import * as React from 'react'
import 'draft-js/dist/Draft.css'
import '~/components/Editor.css'

const Editor: React.FC = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )
  const [contentHtml, setContentHtml] = React.useState('')

  const handleChange = (state: EditorState) => {
    setEditorState(state)
    const html = stateToHTML(state.getCurrentContent())
    setContentHtml(html)
  }

  return (
    <>
      <h1>Draft.js Example</h1>
      <EditorWrapper>
        <DraftJSEditor editorState={editorState} onChange={handleChange} />
      </EditorWrapper>

      <p>result html</p>
      <pre>{contentHtml}</pre>
    </>
  )
}

const EditorWrapper = styled.div({
  height: 400,
  width: '100%',
  border: '1px solid black',
})

export default Editor
