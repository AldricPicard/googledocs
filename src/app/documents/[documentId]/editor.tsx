"use client"
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Color } from '@tiptap/extension-color'
import { useEditorStore } from '@/store/use-editor-store';
import {useEditor, EditorContent} from '@tiptap/react'
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TableRow from '@tiptap/extension-table-row'
import Highlight from '@tiptap/extension-highlight' 
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline';
import TableCell from '@tiptap/extension-table-cell'
import FontFamily from '@tiptap/extension-font-family';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import TableHeader from '@tiptap/extension-table-header'
import { useStorage } from "@liveblocks/react";
import { Ruler } from './ruler';
import { FontSizeExtension } from '@/extensions/font-size';
import { lineHeightExtension } from '@/extensions/line-height';
import { Threads } from "./threads";

export const Editor = () => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension();
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate({editor}) {
      setEditor(editor);
    },
    onDestroy(){
      setEditor(null)
    },
    onUpdate({editor}) {
      setEditor(editor);
    },
    onSelectionUpdate({editor}) {
      setEditor(editor);
    },
    onTransaction({editor}) {
      setEditor(editor);
    },
    onFocus({editor}) {
      setEditor(editor);
    },
    onBlur({editor}) {
      setEditor(editor);
    },
    onContentError({editor}) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
        class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      }
    },
    immediatelyRender: false,
    extensions: [
      liveblocks,
      StarterKit.configure({
        // The Liveblocks extension comes with its own history handling
        history: false,
      }),
      lineHeightExtension,
      FontSizeExtension,
      ImageResize,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https"
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      FontFamily,
      Table,
      Image,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      Underline,
      
    ],
    content: ``,
    
  })
  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor}/>
        <Threads editor={editor} />
      </div>
    </div>
  )
}

