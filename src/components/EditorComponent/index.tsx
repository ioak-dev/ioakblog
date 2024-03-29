import React, { useEffect, useReducer, useState } from 'react';
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Youtube from '@tiptap/extension-youtube'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import './style.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import {
    Editor,
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineComponent,
    HeadingDropdown,
    AlignmentDropdown,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    AddImage,
    AddTable,
    AddYoutubeVideo,
    BlockQuote,
    BulletList,
    ClearFormatting,
    Code,
    CodeBlock,
    FontColor,
    HighlightColor,
    HorizontalRule,
    OrderedList
} from 'writeup';

const theme = {
};

const EditorComponent = () => {
    const editor = useEditor({
        extensions: [
            Highlight,
            Typography,
            Document, Paragraph, Text, TextStyle, Color,
            Underline.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                inline: true,
                allowBase64: true,
            }),
            Youtube.configure({
                inline: false,
                controls: false,
            }),
            Table.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                resizable: true
            }),
            TableRow,
            TableHeader,
            TableCell,
            Highlight.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                multicolor: true,
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            }),
            TaskItem.configure({
                nested: true,
            }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        content: [],
    });

    // editor?.on('update', ({ editor }) => {
    //     console.log(editor.getJSON(), editor.getHTML());
    // })

    return (
        <div id="editor">
            <Editor editor={editor}>
                <Bold editor={editor} />
                <Italic editor={editor} />
                <UnderlineComponent editor={editor} />
                <Strikethrough editor={editor} />
                <AlignLeft editor={editor} />
                <AlignCenter editor={editor} />
                <AlignRight editor={editor} />
                <AlignJustify editor={editor} />
                <HeadingDropdown editor={editor} />
                <AlignmentDropdown editor={editor} />
                <BulletList editor={editor} />
                <OrderedList editor={editor} />
                <BlockQuote editor={editor} />
                <Code editor={editor} />
                <CodeBlock editor={editor} />
                <FontColor editor={editor} />
                <HighlightColor editor={editor} />
                <HorizontalRule editor={editor} />
                <ClearFormatting editor={editor} />
                <AddImage editor={editor} imageUploadMethod="POST" imageUploadParam='file'
                    imageUploadURL={`${process.env.REACT_APP_API_URL}/upload`} />
                <AddTable editor={editor} />
                <AddYoutubeVideo editor={editor} />
            </Editor>
        </div>
    )
}

export default EditorComponent;