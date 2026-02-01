import * as fs from 'fs';
import * as path from 'path';

// List of all API route files
const apiRoutes = [
  'src/app/api/admin/analytics/route.ts',
  'src/app/api/admin/api-keys/route.ts',
  'src/app/api/admin/api-keys/test/route.ts',
  'src/app/api/admin/api-keys/[id]/route.ts',
  'src/app/api/admin/blog/posts/route.ts',
  'src/app/api/admin/blog/static/[locale]/[id]/route.ts',
  'src/app/api/admin/blog/[id]/route.ts',
  'src/app/api/admin/contact/messages/route.ts',
  'src/app/api/admin/contact/[id]/route.ts',
  'src/app/api/admin/create/route.ts',
  'src/app/api/admin/groq-keys/route.ts',
  'src/app/api/admin/itineraries/route.ts',
  'src/app/api/admin/itineraries/[id]/route.ts',
  'src/app/api/admin/partner-clicks/route.ts',
  'src/app/api/admin/site-settings/route.ts',
  'src/app/api/admin/stats/route.ts',
  'src/app/api/auth/forgot-password/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/auth/reset-password/route.ts',
  'src/app/api/auth/verify-reset-code/route.ts',
  'src/app/api/auth/[...nextauth]/route.ts',
  'src/app/api/contact/route.ts',
  'src/app/api/contact/submit/route.ts',
  'src/app/api/geocode/route.ts',
  'src/app/api/newsletter/subscribe/route.ts',
  'src/app/api/newsletter/subscribers/route.ts',
  'src/app/api/settings/social/route.ts',
  'src/app/api/site-settings/route.ts',
  'src/app/api/subscribers/route.ts',
  'src/app/api/tracking/partner-click/route.ts',
  'src/app/api/trips/generate/route.ts',
  'src/app/api/trips/link-anonymous/route.ts',
  'src/app/api/trips/[id]/route.ts',
];

const dynamicExport = '\nexport const dynamic = \'force-dynamic\';\n';

let processedCount = 0;
let skippedCount = 0;

apiRoutes.forEach((routePath) => {
  const fullPath = path.join(process.cwd(), routePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${routePath}`);
    skippedCount++;
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Check if already has dynamic export
  if (content.includes('export const dynamic')) {
    console.log(`⏭️  Skipped (already has dynamic): ${routePath}`);
    skippedCount++;
    return;
  }

  // Find the first line after imports (first line that doesn't start with import or is empty)
  const lines = content.split('\n');
  let insertIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed && !trimmed.startsWith('import') && !trimmed.startsWith('//')) {
      insertIndex = i;
      break;
    }
  }

  // Insert the dynamic export before the first non-import line
  lines.splice(insertIndex, 0, dynamicExport.trim());
  content = lines.join('\n');

  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Processed: ${routePath}`);
  processedCount++;
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Processed: ${processedCount} files`);
console.log(`   ⏭️  Skipped: ${skippedCount} files`);
