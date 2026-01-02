# SEO Deployment Checklist ✅

## Before Deploying to Production

### 1. Update Environment Variables
- [ ] Change `NEXT_PUBLIC_APP_URL` in `.env.local` to your actual domain
  ```
  NEXT_PUBLIC_APP_URL=https://planmynexttravel.com
  ```
  (Replace with your actual domain - without trailing slash)

### 2. Verify Files Exist
- [✅] `/sitemap.xml` - Auto-generated
- [✅] `/robots.txt` - Auto-generated
- [✅] `/site.webmanifest` - Created
- [✅] `/favicon.ico` - Exists in public folder

### 3. Test Locally First
```bash
# Build the production version
npm run build

# Test the production build
npm start

# Then verify these URLs work:
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt
# http://localhost:3000/site.webmanifest
# http://localhost:3000/en
# http://localhost:3000/en/blog
# http://localhost:3000/ads.txt
```

## After Deploying to Production

### 1. Google Search Console Setup
1. Go to: https://search.google.com/search-console
2. Add your domain (planmynexttravel.com)
3. Verify ownership (already done via meta tag)
4. Submit sitemap:
   - Click "Sitemaps" in left menu
   - Enter: `sitemap.xml`
   - Click "Submit"

### 2. Verify URLs Are Live
Visit these URLs and make sure they load:
- [ ] https://planmynexttravel.com/sitemap.xml
- [ ] https://planmynexttravel.com/robots.txt
- [ ] https://planmynexttravel.com/site.webmanifest
- [ ] https://planmynexttravel.com/ads.txt
- [ ] https://planmynexttravel.com/en
- [ ] https://planmynexttravel.com/en/blog

### 3. Test Structured Data
1. Go to: https://search.google.com/test/rich-results
2. Test these pages:
   - [ ] Homepage: https://planmynexttravel.com/en
   - [ ] Blog listing: https://planmynexttravel.com/en/blog
   - [ ] Sample blog post: https://planmynexttravel.com/en/blog/[any-post-slug]
3. Should see: Organization, FAQPage, Blog, Article, BreadcrumbList

### 4. Test Social Sharing
1. Open any blog post
2. Click "Share" button
3. Test each platform:
   - [ ] Twitter
   - [ ] Facebook
   - [ ] LinkedIn
   - [ ] Copy Link

### 5. PageSpeed Test
1. Go to: https://pagespeed.web.dev
2. Test these pages:
   - [ ] Homepage
   - [ ] Blog listing
   - [ ] Sample blog post
3. Target: 80+ on mobile, 90+ on desktop

### 6. Mobile Friendly Test
1. Go to: https://search.google.com/test/mobile-friendly
2. Test homepage and a blog post
3. Should pass without issues

## Monitoring (First Week)

### Daily Checks:
- [ ] Check Google Search Console for crawl errors
- [ ] Monitor sitemap index status
- [ ] Check for any 404 errors

### Weekly Checks:
- [ ] Review impressions/clicks in Search Console
- [ ] Check which pages are getting indexed
- [ ] Monitor average position for keywords

## Ongoing SEO Tasks

### Weekly:
- [ ] Publish 2-3 new blog posts (1000+ words)
- [ ] Add internal links between posts
- [ ] Share new posts on social media

### Monthly:
- [ ] Review Search Console data
- [ ] Identify top-performing content
- [ ] Update old posts with new info
- [ ] Guest post on 1-2 travel blogs

### Quarterly:
- [ ] Audit all content for broken links
- [ ] Update meta descriptions for better CTR
- [ ] Review and update outdated content
- [ ] Analyze competitor rankings

## Tools & Resources

### Free Tools:
- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Schema Validator: https://validator.schema.org

### Content Ideas:
1. "Best Time to Visit [Popular Destination]"
2. "7-Day Itinerary for [City]"
3. "Budget Travel Guide to [Country]"
4. "Hidden Gems in [Destination]"
5. "[Destination] Travel Tips for First-Timers"
6. "Best [Type] Hotels in [City]"
7. "Ultimate [Destination] Packing List"
8. "Is [Destination] Safe for Solo Travelers?"
9. "Best Restaurants in [City]"
10. "[Season] in [Destination]: What to Expect"

## Expected Timeline

### Week 1-2:
- Sitemap indexed by Google
- First 10-20 pages indexed
- 0-50 impressions/day

### Month 1:
- Most pages indexed
- 100-500 impressions/day
- 1-10 clicks/day

### Month 3:
- Ranking for long-tail keywords
- 500-2000 impressions/day
- 10-50 clicks/day

### Month 6:
- Ranking for competitive keywords
- 2000-10000 impressions/day
- 50-200 clicks/day

### Year 1:
- Authority site status
- 10000+ impressions/day
- 500+ clicks/day
- Organic backlinks appearing

## Common Issues & Solutions

### Issue: Sitemap not indexed
**Solution**: 
- Verify sitemap URL is correct
- Check robots.txt allows sitemap
- Manually submit in Search Console

### Issue: Pages not ranking
**Solution**:
- Add more content (aim for 1500+ words)
- Improve internal linking
- Get quality backlinks
- Optimize for user intent

### Issue: High bounce rate
**Solution**:
- Improve page speed
- Add engaging visuals
- Better internal linking
- Clear call-to-action

### Issue: Low click-through rate
**Solution**:
- Optimize meta titles
- Write compelling descriptions
- Use power words and numbers
- Add structured data for rich snippets

---

## Need Help?

- SEO Questions: Check [SEO-ACTION-PLAN.md](./SEO-ACTION-PLAN.md)
- Technical Issues: Check Next.js docs or create GitHub issue
- Content Strategy: See content calendar in SEO-ACTION-PLAN.md

---

Last Updated: January 2, 2026
