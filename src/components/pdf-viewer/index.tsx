import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'iframe'> & ContentBlockRegistry;

export default async function PdfViewer({ block, className, ...rest }: Props) {
  if (!block?.fileUrl) return null;

  try {
    const response = await fetch(block.fileUrl, { method: 'GET' });
    if (!response.ok) return <p>Failed to load file.</p>;

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const isPdf =
      uint8Array[0] === 0x25 &&
      uint8Array[1] === 0x50 &&
      uint8Array[2] === 0x44 &&
      uint8Array[3] === 0x46 &&
      uint8Array[4] === 0x2d;

    if (!isPdf) return <p>File is not a valid PDF.</p>;

    return (
      <iframe
        className={cn('min-h-[50vh] w-full', className)}
        {...rest}
        src={`/pdfjs/web/viewer.html?file=${encodeURIComponent(block.fileUrl)}`}
      />
    );
  } catch (error) {
    console.error('Error loading PDF:', error);
    return <p>Unable to load the file.</p>;
  }
}
