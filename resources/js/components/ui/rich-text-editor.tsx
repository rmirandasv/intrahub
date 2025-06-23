import { useAppearance } from "@/hooks/use-appearance";
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface RichTextEditorProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export default function RichTextEditor<T extends FieldValues>({ field }: RichTextEditorProps<T>) {
  const { appearance } = useAppearance();
  const editor = useCreateBlockNote({
    initialContent: field.value ? JSON.parse(field.value) : undefined,
  });

  return (
    <div className="min-h-48 rounded-lg border bg-(--bn-colors-editor-background) py-4">
      <BlockNoteView
        editor={editor}
        theme={appearance === 'system' ? 'light' : appearance}
        data-theming
        onChange={() => {
          const html = editor.document;
          field.onChange(JSON.stringify(html));
        }}
      />
    </div>
  );
} 