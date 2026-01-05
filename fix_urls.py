import re

# Read the file
with open(r'src\app\[locale]\destinations\[slug]\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all Klook activity URLs with Tokyo city URL
content = re.sub(
    r'https://www\.klook\.com/activity/[^?]+\?aid=12345',
    'https://www.klook.com/en-US/city/19-tokyo-things-to-do/?aid=12345',
    content
)

# Replace all GetYourGuide URLs based on location code in the URL
def replace_getyourguide_url(match):
    url = match.group(0)
    
    # Paris (l16)
    if 'paris-l16' in url or '/l16/' in url:
        return 'https://www.getyourguide.com/paris-l16/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # Iceland (l177 or l30 for Reykjavik)
    elif 'iceland-l177' in url or 'reykjavik-l30' in url:
        return 'https://www.getyourguide.com/iceland-l177/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # Morocco - Marrakech (l91)
    elif 'marrakech-l91' in url:
        return 'https://www.getyourguide.com/marrakech-l91/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # New Zealand - Christchurch (l225)
    elif 'christchurch-l225' in url:
        return 'https://www.getyourguide.com/christchurch-l225/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # New Zealand - Queenstown (l2124)
    elif 'queenstown-l2124' in url:
        return 'https://www.getyourguide.com/queenstown-l2124/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # New Zealand - Auckland (l216)
    elif 'auckland-l216' in url:
        return 'https://www.getyourguide.com/auckland-l216/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # New Zealand - general (l138)
    elif 'new-zealand-l138' in url:
        return 'https://www.getyourguide.com/new-zealand-l138/tours-tc1/?partner_id=YOUR_PARTNER_ID'
    
    # Default: keep original
    return url

# Apply the replacement to all GetYourGuide URLs
content = re.sub(
    r'https://www\.getyourguide\.com/[^"]+',
    replace_getyourguide_url,
    content
)

# Write back
with open(r'src\app\[locale]\destinations\[slug]\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Updated all booking URLs to location-based browsing format")
print("  - Tokyo (Klook): city/19-tokyo-things-to-do")
print("  - Paris (GetYourGuide): paris-l16/tours-tc1")
print("  - Iceland (GetYourGuide): iceland-l177/tours-tc1")
print("  - Morocco (GetYourGuide): marrakech-l91/tours-tc1")
print("  - New Zealand (GetYourGuide): location-specific URLs")
