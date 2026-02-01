import * as fs from 'fs';
import * as path from 'path';

const apiRoutes = [
  'src/app/api/trips/[id]/route.ts',
  'src/app/api/trips/generate/route.ts',
  'src/app/api/tracking/partner-click/route.ts',
  'src/app/api/subscribers/route.ts',
  'src/app/api/newsletter/subscribers/route.ts',
  'src/app/api/newsletter/subscribe/route.ts',
  'src/app/api/contact/submit/route.ts',
  'src/app/api/contact/route.ts',
  'src/app/api/auth/verify-reset-code/route.ts',
  'src/app/api/auth/reset-password/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/auth/forgot-password/route.ts',
  'src/app/api/admin/stats/route.ts',
  'src/app/api/admin/site-settings/route.ts',
  'src/app/api/admin/partner-clicks/route.ts',
  'src/app/api/admin/itineraries/[id]/route.ts',
  'src/app/api/admin/itineraries/route.ts',
  'src/app/api/admin/groq-keys/route.ts',
  'src/app/api/admin/create/route.ts',
  'src/app/api/admin/contact/[id]/route.ts',
  'src/app/api/admin/contact/messages/route.ts',
  'src/app/api/admin/blog/[id]/route.ts',
  'src/app/api/admin/blog/posts/route.ts',
  'src/app/api/admin/blog/static/[locale]/[id]/route.ts',
  'src/app/api/admin/api-keys/[id]/route.ts',
  'src/app/api/admin/api-keys/route.ts',
  'src/app/api/admin/api-keys/test/route.ts',
  'src/app/api/admin/analytics/route.ts',
  'src/app/api/geocode/route.ts',
  'src/app/api/trips/link-anonymous/route.ts',
];

let processedCount = 0;
let skippedCount = 0;

for (const routePath of apiRoutes) {
  const fullPath = path.join(process.cwd(), routePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${routePath}`);
    skippedCount++;
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Skip if already has 'if (!db)' check
  if (content.includes('if (!db)') || content.includes('if(!db)')) {
    console.log(`⏭️  Skipped (already has check): ${routePath}`);
    skippedCount++;
    continue;
  }

  // Skip if doesn't use db
  if (!content.includes('await db.') && !content.includes('await db ')) {
    console.log(`⏭️  Skipped (no db usage): ${routePath}`);
    skippedCount++;
    continue;
  }

  // Find each handler function (GET, POST, PUT, DELETE, PATCH)
  const handlers = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  let modified = false;

  for (const handler of handlers) {
    // Match patterns like: export async function GET(
    const handlerRegex = new RegExp(
      `(export async function ${handler}\\s*\\([^)]*\\)\\s*{\\s*)`,
      'g'
    );
    
    if (handlerRegex.test(content)) {
      content = content.replace(
        handlerRegex,
        `$1\n  if (!db) {\n    return NextResponse.json({ error: 'Database not available' }, { status: 503 });\n  }\n`
      );
      modified = true;
    }
  }

  if (modified) {
    // Make sure NextResponse is imported
    if (!content.includes('NextResponse')) {
      content = content.replace(
        /import\s+{([^}]*)}\s+from\s+['"]next\/server['"]/,
        (match, imports) => {
          if (imports.includes('NextResponse')) return match;
          return `import { ${imports.trim()}, NextResponse } from 'next/server'`;
        }
      );
      
      // If no next/server import, add it
      if (!content.includes('from \'next/server\'') && !content.includes('from "next/server"')) {
        const firstImport = content.indexOf('import');
        content = content.slice(0, firstImport) + 
                  `import { NextResponse } from 'next/server';\n` + 
                  content.slice(firstImport);
      }
    }

    fs.writeFileSync(fullPath, content);
    console.log(`✅ Processed: ${routePath}`);
    processedCount++;
  } else {
    console.log(`⏭️  Skipped (no handlers found): ${routePath}`);
    skippedCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Processed: ${processedCount} files`);
console.log(`   ⏭️  Skipped: ${skippedCount} files`);
