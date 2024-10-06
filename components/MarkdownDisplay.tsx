import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

const MarkdownDisplay = ({ content }: { content: string }) => {
  return (
    <Card className="w-full max-w-2xl mb-8">
      <CardContent className="p-6">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-medium mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default MarkdownDisplay;