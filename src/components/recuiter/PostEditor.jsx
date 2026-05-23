import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { POST_TOOLBAR_ITEMS } from "@/config/constants/post.constant";

function PostEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Viết nội dung bài blog..." }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-80 rounded-b-lg border border-t-0 px-4 py-3 text-sm leading-7 outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const runCommand = (key) => {
    const chain = editor.chain().focus();
    if (key === "bold") chain.toggleBold().run();
    if (key === "italic") chain.toggleItalic().run();
    if (key === "heading2") chain.toggleHeading({ level: 2 }).run();
    if (key === "heading3") chain.toggleHeading({ level: 3 }).run();
    if (key === "bulletList") chain.toggleBulletList().run();
    if (key === "orderedList") chain.toggleOrderedList().run();
  };

  const isActive = (key) => {
    if (key === "heading2") return editor.isActive("heading", { level: 2 });
    if (key === "heading3") return editor.isActive("heading", { level: 3 });
    return editor.isActive(key);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-muted/40 p-2">
        {POST_TOOLBAR_ITEMS.map((item) => (
          <Button
            key={item.key}
            type="button"
            variant={isActive(item.key) ? "default" : "ghost"}
            size="sm"
            className="h-8 min-w-8"
            onClick={() => runCommand(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default PostEditor;
