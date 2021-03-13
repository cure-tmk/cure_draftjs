import createAnchorPlugin from '@draft-js-plugins/anchor'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons'
import DraftJSEditor from '@draft-js-plugins/editor'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import styled from '@emotion/styled'
import { DraftStyleMap, EditorState, RichUtils } from 'draft-js'
import { RenderConfig, stateToHTML } from 'draft-js-export-html'
import * as React from 'react'

import '~/components/Editor.css'
import {
  commands as backgroundColorCommand,
  backgroundColorStyleMap,
  backgroundColorRenderConfig,
} from '~/components/EditorModules/backgroundColor'
import { commands as basicCommands } from '~/components/EditorModules/basic'
import {
  commands as textColorCommand,
  textColorStyleMap,
  textColorRenderConfig,
} from '~/components/EditorModules/textColor'

const commands: { [styleNmae: string]: string } = {
  ...backgroundColorCommand,
  ...basicCommands,
  ...textColorCommand,
}

const inlineStyleMap: DraftStyleMap = {
  ...textColorStyleMap,
  ...backgroundColorStyleMap,
}

const inlineStyleOptions: { [styleName: string]: RenderConfig } = {
  ...textColorRenderConfig,
  ...backgroundColorRenderConfig,
}

const anchorPlugin = createAnchorPlugin()
const linkifyPlugin = createLinkifyPlugin()
const inlineToolbarPlugin = createInlineToolbarPlugin()

const { InlineToolbar } = inlineToolbarPlugin

const plugins = [inlineToolbarPlugin, linkifyPlugin, anchorPlugin]

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
        <button onClick={() => applyInlineStyle(commands.BOLD)} type="button">
          bold
        </button>
        <button onClick={() => applyInlineStyle(commands.ITALIC)} type="button">
          italic
        </button>
        <button
          onClick={() => applyInlineStyle(commands.UNDERLINE)}
          type="button"
        >
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
          plugins={plugins}
        />
        <InlineToolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <anchorPlugin.LinkButton {...externalProps} />
            </>
          )}
        </InlineToolbar>
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
