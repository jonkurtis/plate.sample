

import {
  Plate,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  ELEMENT_IMAGE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,


  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  MentionSelect,
  PlatePlugin,

  ToolbarSearchHighlight,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  useFindReplacePlugin,
  useMentionPlugin,
  withProps,
  MentionElement,
  ELEMENT_MENTION,
  SPEditor,
  MARK_COLOR,
  withStyledProps,
  StyledLeaf,
  MARK_BG_COLOR,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
} from '@udecode/plate'

import { Text } from 'slate'

export function createElement(
  text = '', element) {
  const {
    type = ELEMENT_PARAGRAPH,
    mark=undefined,
  } = element | {};
  // console.log(`createElement( text=${text}, type=${type}, mark=${mark})`)

  const leaf = { text }
  if (mark) {
    leaf[mark] = true
  }

  return {
    type,
    children: [leaf],
  }
}

export const createList = (
  items,
  { splitSeparator = '`' } = {}
) => {
  const children = items.map((item) => {
    const texts = item.split(splitSeparator)
    const marks = texts.map((text, index) => {
      const res = { text }
      if (index % 2 === 1) {
        res.code = true
      }
      return res
    })

    return {
      type: ELEMENT_LI,
      children: [
        {
          type: ELEMENT_LIC,
          children: marks,
        },
      ],
    }
  })

  return [
    {
      type: ELEMENT_UL,
      children,
    },
  ]
}

export const getNodesWithRandomId = (nodes) => {
  let _id = 10000
  nodes.forEach((node) => {
    node.id = _id
    _id++
  })

  return nodes
}
