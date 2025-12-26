# Quick Start Guide

## What is Dork Scanner Pro?

Dork Scanner Pro is a modern web application that helps security researchers and bug bounty hunters discover potential security issues using Google Dorks - advanced search queries that can reveal:

- Exposed sensitive files (.env, config files, backups)
- Vulnerable endpoints (XSS, SQLi, SSRF, LFI)
- Misconfigured cloud storage (AWS S3, Azure, GCP)
- Admin panels and authentication pages
- Database interfaces (phpMyAdmin, MongoDB)
- And much more!

## Features at a Glance

✅ **70+ Pre-built Google Dorks** - Ready to use, organized by category
✅ **Custom Dork Builder** - Create your own queries visually
✅ **Multi-Domain Support** - Test multiple targets at once
✅ **Advanced Filtering** - Search and filter by severity/category
✅ **Favorites System** - Save your most-used dorks
✅ **Dark/Light Mode** - Beautiful UI that's easy on the eyes
✅ **No Backend Required** - Everything runs in your browser

## 5-Minute Setup

1. **Navigate to the project folder**
   ```bash
   cd google-dorks-pro
   ```

2. **Install dependencies** (first time only)
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Go to: http://localhost:3000
   - That's it!

## How to Use

### Step 1: Add Your Target Domain(s)
1. Type your target domain in the input field (e.g., `example.com`)
2. Press Enter or click the `+` button
3. Add multiple domains if needed

### Step 2: Browse Dorks
- Scroll through the 70+ pre-built dorks
- Use the search bar to find specific types
- Filter by severity (Critical, High, Medium, Low, Info)
- Filter by category (Exposed Files, Vulnerabilities, Cloud Storage, etc.)

### Step 3: Execute Dorks
- Click any domain button on a dork card to search Google instantly
- Click "Copy" to copy the query for manual use
- Click the ❤️ icon to save to favorites

### Step 4: Build Custom Dorks (Optional)
1. Click the "Custom Builder" tab
2. Add Google dork operators (site:, inurl:, ext:, etc.)
3. Fill in values
4. Click "Build Query"
5. Copy or search directly

## Common Use Cases

### Finding Exposed Configuration Files
1. Filter by category: "Exposed Files"
2. Filter by severity: "Critical" or "High"
3. Add your target domain
4. Click to search each dork

### Hunting for XSS Vulnerabilities
1. Search for "xss" in the search bar
2. Or filter by category: "Vulnerabilities"
3. Look for dorks with XSS tags
4. Test on your target domains

### Cloud Storage Enumeration
1. Filter by category: "Cloud Storage"
2. Add your organization/company name as a domain
3. Execute AWS, Azure, and GCP dorks

## Tips & Best Practices

🎯 **Start Broad, Then Narrow**
- Begin with general dorks
- Use specific ones based on what you find

🔍 **Use Multiple Filters**
- Combine search + severity + category for precise results

💾 **Save Your Favorites**
- Build a collection of your most effective dorks
- Access them quickly from the Favorites tab

🎨 **Switch Themes**
- Click the sun/moon icon in the header
- Choose Dark, Light, or System theme

⚖️ **Stay Legal**
- Only test authorized targets
- Respect Google's rate limits
- Follow responsible disclosure

## Keyboard Shortcuts

- `Enter` while typing: Add domain
- `Ctrl/Cmd + K`: Focus search (browser default)

## Next Steps

1. **Explore the Dork Database**: Browse all 70+ dorks to understand what's available
2. **Customize for Your Needs**: Use the Custom Builder to create specific queries
3. **Organize with Favorites**: Star the dorks you use most often
4. **Expand the Collection**: Add your own dorks to `src/data/dorks.ts`

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Review the dork syntax at [Google Advanced Search Operators](https://www.google.com/advanced_search)

## Security Reminder

This tool is for **authorized security testing only**. Always:
- ✅ Get explicit permission before testing
- ✅ Use on bug bounty programs with proper scope
- ✅ Follow responsible disclosure practices
- ❌ Never test unauthorized systems
- ❌ Don't abuse Google's services

---

Happy (ethical) hacking! 🔒
