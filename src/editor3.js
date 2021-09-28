
import 'tippy.js/dist/tippy.css'
import './index.css'
import ReactDOM from 'react-dom'
import React, { useMemo } from 'react'
import {
    ELEMENT_IMAGE,
    ELEMENT_PARAGRAPH,
    createPlateComponents,
    createPlateOptions,
    HeadingToolbar,
    MentionSelect,
    PlatePlugin,
    Plate,
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
import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
    ExcalidrawElement,
} from '@udecode/plate-excalidraw'
import { initialValuePlayground } from './config/initialValues'
import {
    editableProps,
    optionsExitBreakPlugin,
    optionsMentionPlugin,
    optionsResetBlockTypePlugin,
    optionsSoftBreakPlugin,
    optionsAutoformat,
} from './config/pluginOptions'
import { renderMentionLabel } from './config/renderMentionLabel'
import { BallonToolbarMarks, ToolbarButtons } from './config/Toolbars'
import { withStyledPlaceHolders } from './config/withStyledPlaceHolders'
import { withStyledDraggables } from './config/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Search } from '@styled-icons/material/Search'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'


const id = 'Examples/Playground'

let components = createPlateComponents({
    [ELEMENT_MENTION]: withProps(MentionElement, {
        renderLabel: renderMentionLabel,
    }),
    [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
    [MARK_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_COLOR]: ['color'],
        },
    }),
    [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_BG_COLOR]: ['backgroundColor'],
        },
    }),
    // customize your components by plugin key
})
components = withStyledPlaceHolders(components)

components = withStyledDraggables(components)

const options = createPlateOptions({
    // customize your options by plugin key
})


export default function PEditor3() {

    let styledComponents = createPlateComponents({
        ...components,
        [ELEMENT_MENTION]: withProps(MentionElement, {
            renderLabel: renderMentionLabel,
        }),
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [MARK_COLOR]: withStyledProps(StyledLeaf, {
            leafProps: {
                [MARK_COLOR]: ['color'],
            },
        }),
        [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
            leafProps: {
                [MARK_BG_COLOR]: ['backgroundColor'],
            },
        }),
        [MARK_FONT_SIZE]: withStyledProps(StyledLeaf, {
            leafProps: {
                [MARK_FONT_SIZE]: ['fontSize'],
            },
        }),
    });
    styledComponents = withStyledPlaceHolders(styledComponents);

    const defaultOptions = createPlateOptions();

    const Editor = () => {
        const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin();
        const { getMentionSelectProps, plugin: mentionPlugin } = useMentionPlugin(
            optionsMentionPlugin
        );

        const pluginsMemo = useMemo(() => {
            const plugins = [
                createReactPlugin(),
                createHistoryPlugin(),
                createParagraphPlugin(),
                createBlockquotePlugin(),
                createTodoListPlugin(),
                createHeadingPlugin(),
                createImagePlugin(),
                createHorizontalRulePlugin(),
                createLinkPlugin(),
                createListPlugin(),
                createTablePlugin(),
                createMediaEmbedPlugin(),
                createExcalidrawPlugin(),
                createCodeBlockPlugin(),
                createAlignPlugin(),
                createBoldPlugin(),
                createCodePlugin(),
                createItalicPlugin(),
                createHighlightPlugin(),
                createUnderlinePlugin(),
                createStrikethroughPlugin(),
                createSubscriptPlugin(),
                createSuperscriptPlugin(),
                createFontColorPlugin(),
                createFontBackgroundColorPlugin(),
                createFontSizePlugin(),
                createKbdPlugin(),
                createNodeIdPlugin(),
                createAutoformatPlugin(optionsAutoformat),
                createResetNodePlugin(optionsResetBlockTypePlugin),
                createSoftBreakPlugin(optionsSoftBreakPlugin),
                createExitBreakPlugin(optionsExitBreakPlugin),
                createNormalizeTypesPlugin({
                    rules: [{ path: [0], strictType: ELEMENT_H1 }],
                }),
                createTrailingBlockPlugin({ type: ELEMENT_PARAGRAPH }),
                createSelectOnBackspacePlugin({ allow: [ELEMENT_IMAGE, ELEMENT_HR] }),
                mentionPlugin,
                searchHighlightPlugin,
            ];

            plugins.push(
                ...[
                    createDeserializeMDPlugin({ plugins }),
                    createDeserializeCSVPlugin({ plugins }),
                    createDeserializeHTMLPlugin({ plugins }),
                    createDeserializeAstPlugin({ plugins }),
                ]
            );

            return plugins;
        }, [mentionPlugin, options, searchHighlightPlugin]);

        return (
            <Plate
                id="playground"
                plugins={pluginsMemo}
                components={styledComponents}
                options={defaultOptions}
                editableProps={editableProps}
                initialValue={initialValuePlayground}
            >
                <ToolbarSearchHighlight icon={Search} setSearch={setSearch} />
                <HeadingToolbar>
                    <ToolbarButtonsBasicElements />
                    <ToolbarButtonsList />
                    <ToolbarButtonsBasicMarks />
                    <ToolbarColorPicker
                        pluginKey={MARK_COLOR}
                        icon={<FormatColorText />}
                    />
                    <ToolbarColorPicker
                        pluginKey={MARK_BG_COLOR}
                        icon={<FontDownload />}
                    />
                    <ToolbarButtonsAlign />
                    <ToolbarLink icon={<Link />} />
                    <ToolbarImage icon={<Image />} />
                    <ToolbarButtonsTable />
                </HeadingToolbar>

                <BallonToolbarMarks />

                <MentionSelect
                    {...getMentionSelectProps()}
                    renderLabel={renderMentionLabel}
                />
            </Plate>
        );

    }
}