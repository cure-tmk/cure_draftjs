import styled from '@emotion/styled'
import {
  DraftStyleMap,
  Editor as DraftJSEditor,
  EditorState,
  RichUtils,
} from 'draft-js'
import { RenderConfig, stateToHTML } from 'draft-js-export-html'
import * as React from 'react'

import 'draft-js/dist/Draft.css'
import '~/components/Editor.css'
import {
  backgroundColorStyleMap,
  backgroundColorRenderConfig,
} from '~/components/EditorModules/backgroundColor'
import {
  textColorStyleMap,
  textColorRenderConfig,
} from '~/components/EditorModules/textColor'

const inlineStyleMap: DraftStyleMap = {
  ...textColorStyleMap,
  ...backgroundColorStyleMap,
}

const inlineStyleOptions: { [styleName: string]: RenderConfig } = {
  ...textColorRenderConfig,
  ...backgroundColorRenderConfig,
}

const Editor: React.FC = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )
  const [contentHtml, setContentHtml] = React.useState('')

  const handleChange = (state: EditorState) => {
    setEditorState(state)
    const html = stateToHTML(state.getCurrentContent(), {
      inlineStyles: inlineStyleOptions,
    })
    setContentHtml(html)
  }

  const applyInlineStyle = (command: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, command)
    if (newState) {
      setEditorState(newState)
    }
  }

  return (
    <>
      <h1>Draft.js Example</h1>
      <div>
        <button onClick={() => applyInlineStyle('BOLD')} type="button">
          bold
        </button>
        <button onClick={() => applyInlineStyle('ITALIC')} type="button">
          italic
        </button>
        <button onClick={() => applyInlineStyle('UNDERLINE')} type="button">
          underline
        </button>
        {/* color */}
        <div>
          {Object.keys(textColorStyleMap).map((c) => (
            <button
              key={`color-${c}`}
              onClick={() => applyInlineStyle(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {/* bg color */}
      <div>
        {Object.keys(backgroundColorStyleMap).map((c) => (
          <button
            key={`color-${c}`}
            onClick={() => applyInlineStyle(c)}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>
      <EditorWrapper>
        <DraftJSEditor
          customStyleMap={inlineStyleMap}
          editorState={editorState}
          onChange={handleChange}
        />
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
