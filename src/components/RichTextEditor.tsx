'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[150px]'
        }
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-100 p-2 border-b flex gap-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
            >
                Bold
            </button>
            <button
                 type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
            >
                Italic
            </button>
        </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}
