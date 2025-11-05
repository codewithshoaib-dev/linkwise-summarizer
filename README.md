# LinkWise Summarizer

A lightweight Next.js mini-app that lets you paste multiple URLs and get concise, smart summaries for each link.  
Built to explore server-side content extraction, summarization, and a clean modern UI.

## 🚀 Features

- Accepts multiple links separated by space or newline  
- Fetches and analyzes page content (not just meta tags)  
- Generates readable summaries for each link  
- Minimal, responsive interface with toast notifications  
- Built with Next.js 14, TailwindCSS, and Sonner

## 🧠 How It Works

1. Enter one or more URLs.  
2. The server fetches each page’s content.  
3. The API extracts meaningful text and returns a short summary.  
4. Results appear in scrollable cards on the right side.

## 🛠️ Stack

- **Frontend:** Next.js, TailwindCSS  
- **Backend:** Next.js API Routes  
- **UI Components:** Sonner (for toasts)

## 💡 Ideas for Improvement

- Add language detection & translation  
- Integrate AI for smarter summaries  
- Browser extension version  
- History view for past links

## 📦 Setup

```
git clone https://github.com/codewithshoaib-dev/linkwise-summarizer.git
cd linkwise-summarizer
npm install
npm run dev
```
Then open http://localhost3000.
