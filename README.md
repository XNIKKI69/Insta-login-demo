# SwordEX (Static Firebase App)

This is a **no-build** version of SwordEX. You can upload these files directly to **GitHub Pages** (or any static host).

## Features
- Firebase Auth (Email/Password, Google sign-in button included)  
- Profiles (username, bio, avatar to Storage)  
- Feed (create post with image, like/unlike, comments)  
- Direct Messages (1–1)  
- Group Chat (create groups, live messages)  
- Hash routing so GitHub Pages won't 404

## Setup
1. In `index.html`, find `firebaseConfig` and replace the **three dots** (`"..."`) values with your real **apiKey, messagingSenderId, appId** from Firebase console. The other fields are already set to `swordex-login`.
2. In Firebase console:
   - Enable **Authentication → Email/Password** (and **Google** if you want).
   - Create **Cloud Firestore → Start in production**.
   - Enable **Storage**.
3. Recommended Firestore Rules (simple demo-safe default, tweak later):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
4. Storage Rules (demo):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
5. Deploy:
   - Create a GitHub repo and **upload these files** at the root.
   - Go to **Settings → Pages → Source: main branch / root**.
   - Open the published URL. Done.

## Notes
- This version avoids any Node/Vite build, so no white screen from routing.
- UI is minimal but clean; you can customize CSS in `<style>`.
- For username search, it matches **exact** `name`. Improve with indexes later.
