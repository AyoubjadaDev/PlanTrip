# 🔑 API Key Management - Complete Guide

## Overview
Full API key management system for Groq API integration with key generation, rotation, activation/deactivation, and usage tracking.

---

## Features

### ✅ Generate API Keys
- Create new random API keys with `groq_` prefix
- Keys are shown only once at creation time
- Copy to clipboard functionality
- Warning message to save the key safely

### ✅ View & List Keys
- See all generated API keys
- Last 4 characters visible (masked for security)
- View creation date for each key
- Track usage count (number of requests made)
- Status badge (Active/Inactive)

### ✅ Rotate Keys
- Deactivate old keys without deleting
- Generate new keys for rotation
- Keep old keys for reference
- Gradual migration to new keys

### ✅ Manage Keys
- Activate/Deactivate toggle
- Delete keys permanently
- Confirmation dialog for destructive actions
- Copy key to clipboard with feedback

---

## Location in Admin Panel

Navigate to: **Admin Dashboard → API Keys Tab** (5th tab with 🔑 icon)

```
Admin Dashboard
├── 📊 Analytics Dashboard
├── 📝 Blog Management
├── 📧 Contact Messages
├── 📈 Advanced Reporting
└── 🔑 API Keys ← YOU ARE HERE
```

---

## How to Use

### Generate a New API Key

1. Click **"+ Generate New Key"** button
2. Click **"Generate Key"** button in the form
3. Your new key appears (example: `groq_abc123...def456`)
4. **IMPORTANT:** Click copy button and save the key somewhere safe
5. Click **"Close"** when done
6. Key is automatically added to your list

### Activate/Deactivate Keys

1. Find the key in the list
2. Click **"🔒 Deactivate"** to disable it (won't work for requests)
3. Click **"🔓 Activate"** to re-enable it
4. Status badge updates immediately

### Delete a Key

1. Find the key in the list
2. Click **"Delete"** button
3. Confirm the deletion in the popup
4. Key is permanently removed from the system

### Copy a Key

1. Find the key in the list
2. Click the **copy icon** next to the key
3. "✓" checkmark appears briefly confirming it's copied
4. Paste it wherever you need it

---

## API Endpoints

### List All API Keys
```
GET /api/admin/api-keys
Response: Array of API keys (masked)
```

### Generate New Key
```
POST /api/admin/api-keys
Body: { "action": "generate" }
Response: { id, key (full), isActive, createdAt, usageCount }
```

### Update Key Status
```
PATCH /api/admin/api-keys/[id]
Body: { "isActive": true|false }
Response: Updated key object (masked)
```

### Delete Key
```
DELETE /api/admin/api-keys/[id]
Response: { success: true, message: "API key deleted" }
```

---

## Security Features

### 🔒 Key Masking
- Full keys only shown once at creation
- In lists, only last 4 characters visible
- Example: `***...def456`
- Prevents accidental exposure in screenshots/logs

### 🛡️ Access Control
- Admin-only endpoints (isAdmin check)
- Authentication required (NextAuth session)
- Returns 403 for non-admin users
- Proper error handling

### 🔑 Key Generation
- Cryptographically secure random generation
- 64-character hex string + `groq_` prefix
- Unique keys each time
- Cannot be recovered if lost

### ⚠️ Rotation Support
- Deactivate without deleting
- Generate new keys anytime
- Keep old keys for reference
- Gradual migration possible

---

## Key Information Stored

For each API key, we store:

| Field | Purpose | Example |
|-------|---------|---------|
| `id` | Unique identifier | UUID |
| `key` | The actual API key | groq_abc123...def456 |
| `isActive` | Whether key works | true/false |
| `usageCount` | Number of requests | 42 |
| `createdAt` | When key was generated | 2025-12-29 |

---

## Best Practices

### ✅ Do This
- ✅ Copy and save new keys immediately
- ✅ Rotate keys regularly (every 30-90 days)
- ✅ Deactivate old keys before deleting
- ✅ Use separate keys for different environments
- ✅ Monitor usage count to detect anomalies
- ✅ Document which key is used where

### ❌ Don't Do This
- ❌ Share keys in emails or chat
- ❌ Commit keys to version control
- ❌ Reuse the same key everywhere
- ❌ Leave old keys active unnecessarily
- ❌ Delete keys without backup plan
- ❌ Ignore high usage counts

---

## Troubleshooting

### Can't See the API Keys Tab?
- Make sure you're logged in as an admin
- Check that your user has `isAdmin: true` in database
- Refresh the page

### Generated Key Not Appearing in List?
- Click "Close" to complete the generation
- The key should be added to the list automatically
- Refresh page if needed

### Can't Copy the Key?
- Check browser permissions for clipboard access
- Try clicking the copy button again
- Use manual selection and Ctrl+C

### Accidentally Deleted a Key?
- Unfortunately, deleted keys cannot be recovered
- Generate a new key instead
- Update any code using the old key

### Key Says "Inactive" - Why?
- You may have deactivated it by accident
- Click the "Activate" button to re-enable it
- Check if it matches your current usage

---

## Integration Example

### Using an API Key in Your Code

```javascript
// Get the API key from environment variables
const apiKey = process.env.GROQ_API_KEY;

// Use it in Groq API calls
const response = await fetch('https://api.groq.com/...', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
});
```

### Rotate Keys Safely

1. Generate new key in admin panel
2. Update environment variables/config
3. Test with new key
4. Deactivate old key in admin panel
5. Delete old key after confirmation

---

## Database Schema

Keys are stored in `groq_api_keys` table:

```sql
CREATE TABLE groq_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  isActive BOOLEAN DEFAULT true,
  usageCount INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT now()
);
```

---

## Statistics

### Key Management Metrics
- **Total Keys Generated:** See in list
- **Active Keys:** Count of isActive = true
- **Usage:** Track per-key usage count
- **Creation Date:** See when each key was made

### Monitoring
- Check usage count for anomalies
- Deactivate unused keys
- Regular rotation every 30-90 days
- Alert if usage exceeds threshold

---

## Related Documentation

For more information about:
- [Admin Features](ADMIN-FEATURES-IMPLEMENTATION.md)
- [Admin Deployment](ADMIN-DEPLOYMENT-GUIDE.md)
- [Complete Implementation](ADMIN-IMPLEMENTATION-COMPLETE.md)

---

## Summary

The API Key Management interface provides:
- ✅ Secure key generation with random cryptography
- ✅ Easy key rotation without deletion
- ✅ Activation/deactivation for testing
- ✅ Usage tracking for monitoring
- ✅ Admin-only access control
- ✅ Key masking for security
- ✅ Copy-to-clipboard convenience

**Available at:** `/admin` → **API Keys** tab

---

**Last Updated:** December 29, 2025
**Status:** ✅ Production Ready
