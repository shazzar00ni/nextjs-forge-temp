import type { CoreMessage } from 'ai';
import type { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import { twMerge } from 'tailwind-merge';

type MessageProps = {
  data: CoreMessage;
  markdown?: ComponentProps<typeof Markdown>;
};

const getMessageContent = (content: CoreMessage['content']): string => {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    // Extract text content from array of parts
    return content
      .map((part) => {
        if ('type' in part && part.type === 'text') {
          return part.text;
        }
        return '';
      })
      .join('');
  }
  return '';
};

export const Message = ({ data, markdown }: MessageProps) => (
  <div
    className={twMerge(
      'flex max-w-[80%] flex-col gap-2 rounded-xl px-4 py-2',
      data.role === 'user'
        ? 'self-end bg-foreground text-background'
        : 'self-start bg-muted'
    )}
  >
    <Markdown {...markdown}>{getMessageContent(data.content)}</Markdown>
  </div>
);
