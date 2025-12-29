# 🔧 Google Maps API - Geocoding Fix

## Problem: "Unable to locate [city]"

If you're getting 100% errors in the Geocoding API metrics, this is usually caused by **API Key Restrictions**.

## ✅ Solution: Fix API Key Restrictions

### Step 1: Check Your API Key Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your API Key and click on it
4. Look for **"API restrictions"** section

### Step 2: Fix the Restrictions

**Option A: Unrestricted (Best for Development)**
- Under "API restrictions", select **"Don't restrict key"**
- Click **Save**
- ⚠️ Only use for development/testing

**Option B: Restricted to Specific APIs (Recommended)**
- Under "API restrictions", select **"Restrict key"**
- Choose **"Google Maps APIs"** (or select multiple):
  - ✅ Maps JavaScript API
  - ✅ Geocoding API
  - ✅ Places API
- Click **Save**

### Step 3: Check Application Restrictions

While on the same API Key page:

1. Look for **"Application restrictions"**
2. Select one of:
   - **"None"** (for development)
   - **"HTTP referrers (web sites)"** (recommended for production)
     - Add your domain: `yoursite.com/*`

### Step 4: Wait & Test

After saving:
- ⏳ Wait **5-10 minutes** for changes to propagate
- Restart your dev server: `npm run dev`
- Generate a new trip and test the map

---

## 📊 Checking If It Works

### Browser Console Check
Press **F12** → **Console** tab and look for:

**Success Messages:**
```
Geocoding status for destination: OK 1
```

**Error Messages:**
```
Geocoding error: ZERO_RESULTS
Geocoding error: REQUEST_DENIED  ← This means API restrictions issue!
Geocoding error: INVALID_REQUEST
```

---

## 🆘 If Still Getting Errors

### Error: REQUEST_DENIED
This means the API key doesn't have permission.
- ✅ Make sure Geocoding API is **enabled** (not just in restrictions, but in **APIs & Services → Library**)
- ✅ Make sure there are **no API restrictions** OR Geocoding API is listed

### Error: ZERO_RESULTS
The address couldn't be found.
- Try using full address: `"Casablanca, Morocco"` instead of just `"Casablanca"`
- The system tries both, but specific locations work better

### Error: QUOTA_EXCEEDED
You've hit your API quota.
- Check [Google Cloud Console](https://console.cloud.google.com/) → **Quotas**
- Increase quota limits if needed

---

## 🔍 Quick Checklist

- [ ] API Key is in `.env` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- [ ] **Geocoding API is ENABLED** in Google Cloud Library
- [ ] **Maps JavaScript API is ENABLED** in Google Cloud Library
- [ ] **Places API is ENABLED** in Google Cloud Library
- [ ] API Key restrictions allow **Geocoding API** (or set to unrestricted)
- [ ] 10 minutes have passed since making changes
- [ ] Dev server has been restarted
- [ ] Browser cache cleared (hard refresh: Ctrl+Shift+R)

---

## 📝 Detailed Step-by-Step

### Enable Geocoding API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Search for **"Geocoding API"** in the search bar
3. Click on it
4. Click **"Enable"** button
5. Wait for it to enable

### Fix API Key Restrictions

1. Go to **APIs & Services** → **Credentials**
2. Click on your API Key name
3. Scroll down to **"API restrictions"**
4. Select **"Don't restrict key"** (for now)
5. Click **"Save"**
6. ⏳ Wait 5-10 minutes

### Test It Works

```bash
# In your browser console, paste this:
const apiKey = 'YOUR_API_KEY_HERE';
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=Casablanca&key=${apiKey}`;
fetch(url).then(r => r.json()).then(d => console.log(d));
```

If it returns coordinates, your API key works!

---

## 🚀 Common Solutions

| Problem | Solution |
|---------|----------|
| "REQUEST_DENIED" | Remove API restrictions or add Geocoding API |
| "ZERO_RESULTS" | Use full address (e.g., "Paris, France") |
| "INVALID_REQUEST" | Check API key syntax and that it's in `.env` |
| 100% Errors in metrics | API key restrictions blocking the request |
| Map loads but no markers | Activity extraction might be failing (check console) |

---

## 📞 Debug Info to Share

If you're still stuck, share these from browser console (F12):

1. **API Key** (first 20 characters): `AIzaSyA3BVb7Jiv...`
2. **Error message**: Copy from console
3. **Status code**: e.g., "REQUEST_DENIED", "ZERO_RESULTS"
4. **Destination tried**: e.g., "Casablanca"

---

## ⏭️ Next Steps

Once the map works:

1. ✅ Test with different cities
2. ✅ Check that activity markers appear
3. ✅ Click markers to see info windows
4. ✅ In production, set API restrictions to your domain

---

**Last Updated**: December 29, 2025
**Status**: Fix guides added ✨
