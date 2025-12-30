// fix-blog-data.ts
// Script to clean up and restore a valid src/data/blog.ts file for Next.js
// Usage: npx ts-node fix-blog-data.ts

import * as fs from 'fs';
import * as path from 'path';

const BLOG_PATH = path.join(__dirname, 'src', 'data', 'blog.ts');

const validType = `export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags?: string[];
};\n\n`;

const validExport = `export const blogPosts: Record<string, BlogPost[]> = {\n  en: [\n    // Add your blog post objects here\n  ]\n};\n`;

function fixBlogFile() {
  if (!fs.existsSync(BLOG_PATH)) {
    console.error('blog.ts not found at', BLOG_PATH);
    process.exit(1);
  }
  fs.writeFileSync(BLOG_PATH, validType + validExport, 'utf8');
  console.log('blog.ts has been reset to a valid empty state.');
}

fixBlogFile();
