
SwordEX - React + Firebase starter (Vite)

How to use:
1. unzip and run:
   npm install
   npm run dev    # for local dev
   npm run build  # builds to dist/

2. Deploy:
   - For GitHub Pages: build and push `dist/` contents to `gh-pages` branch or use GitHub Actions.
   - Or use Firebase Hosting for easier deploy.

Firebase setup:
- Authentication: enable Email/Password and Google
- Firestore: create database (test mode)
- Add Authorized domain: your GitHub Pages domain (e.g., nikki69.github.io)

Firebase config is already placed in src/firebase.js. Replace apiKey/messaging/appId if you want full values.
