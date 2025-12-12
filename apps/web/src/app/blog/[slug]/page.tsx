import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/Callout';

const components = {
  pre: CodeBlock,
  Callout,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return (
      <CodeBlock language={match ? match[1] : undefined}>
        {children}
      </CodeBlock>
    );
  },
};

async function getPost(slug: string) {
  try {
    const filePath = join(process.cwd(), 'src', 'content', 'posts', `${slug}.mdx`);
    const content = readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPost(slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-zinc dark:prose-zinc max-w-none">
          <MDXRemote source={content} components={components} />
        </article>
      </div>
    </div>
  );
}
