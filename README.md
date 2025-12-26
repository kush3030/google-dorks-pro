# Dork Scanner Pro 🔍

A modern, professional Google Dorks scanner built for security researchers and bug bounty hunters. Discover vulnerabilities, exposed files, and security misconfigurations with an intuitive interface and powerful features.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Beautiful Modern UI
- Clean, professional interface built with Shadcn/UI components
- Dark/Light theme support with system preference detection
- Smooth animations and transitions
- Fully responsive design for mobile and desktop

### 🔍 Advanced Dork Management
- **70+ Pre-built Google Dorks** organized by category:
  - Exposed Files & Configuration
  - Vulnerabilities (XSS, SQLi, SSRF, LFI, etc.)
  - Cloud Storage (AWS, Azure, GCP, DigitalOcean)
  - Authentication & Admin Panels
  - CMS Platforms (WordPress, Drupal, Joomla)
  - Databases & Network Devices
  - Sensitive Data & Documents

### 🎯 Powerful Filtering
- Real-time search across titles, descriptions, and tags
- Filter by severity: Critical, High, Medium, Low, Info
- Filter by category with multi-select support
- Visual severity indicators with color coding

### 🛠 Custom Dork Builder
- Interactive visual builder with Google dork operators
- Quick templates for common scenarios
- Syntax helper with operator descriptions
- One-click copy and Google search integration

### 💾 Smart Features
- **Favorites System**: Save your most-used dorks with localStorage persistence
- **Multi-Domain Support**: Test multiple targets simultaneously
- **One-Click Execution**: Direct Google search integration
- **Copy Functionality**: Quick copy queries to clipboard
- **Statistics Dashboard**: Track your dorks, domains, and favorites

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd google-dorks-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Basic Workflow

1. **Add Target Domains**
   - Enter one or more target domains in the input field
   - Press Enter or click the + button to add
   - Add multiple domains separated by commas

2. **Browse & Filter Dorks**
   - Use the search bar to find specific dorks
   - Filter by severity and category
   - Click badges to toggle filters

3. **Execute Dorks**
   - Click the domain button on any dork card to search on Google
   - Click "Copy" to copy the query template
   - Use the heart icon to save favorites

4. **Build Custom Dorks**
   - Switch to the "Custom Builder" tab
   - Add operators and values visually
   - Use quick templates or suggestions
   - Build and test your custom queries

### Keyboard Shortcuts
- `Enter` in domain input: Add domain
- Click badges in filters: Toggle filter
- Click dork cards: Expand/interact

## 🏗 Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Storage**: localStorage for favorites

## 📁 Project Structure

```
google-dorks-pro/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Shadcn/UI components
│   │   ├── header.tsx          # Header with theme toggle
│   │   ├── domain-input.tsx    # Domain input component
│   │   ├── filters.tsx         # Advanced filtering system
│   │   ├── stats.tsx           # Statistics dashboard
│   │   ├── dork-card.tsx       # Individual dork card
│   │   └── dork-builder.tsx    # Custom dork builder
│   ├── data/
│   │   └── dorks.ts            # Comprehensive dork database
│   ├── types/
│   │   └── dork.ts             # TypeScript type definitions
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                      # Static assets
└── package.json
```

## 🔐 Security & Legal Disclaimer

**IMPORTANT**: This tool is intended for:
- Authorized security testing and penetration testing
- Bug bounty programs with proper authorization
- Educational and research purposes
- Security assessments on systems you own or have permission to test

**DO NOT**:
- Use on systems without explicit authorization
- Conduct unauthorized penetration testing
- Violate Google's Terms of Service
- Engage in any illegal activities

The authors and contributors are not responsible for misuse of this tool.

## 🎯 Roadmap

Future enhancements planned:
- [ ] Export results to PDF/CSV/JSON
- [ ] Browser extension integration
- [ ] API integration (Shodan, SecurityTrails)
- [ ] Collaborative features (share dork collections)
- [ ] Result aggregation and analysis
- [ ] History tracking with timestamps
- [ ] Rate limiting indicators
- [ ] Bulk domain scanning with queue
- [ ] Custom dork collections management

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new dorks to the database
- Improve UI/UX
- Fix bugs
- Add new features
- Improve documentation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [TakSec's Google Dorks Bug Bounty](https://github.com/TakSec/google-dorks-bug-bounty)
- Built with [Shadcn/UI](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

For questions, suggestions, or security concerns, please open an issue on GitHub.

---

**Remember**: With great power comes great responsibility. Use this tool ethically and legally.
