# 🗣️ Nao Medical Voice Translator

A fast, user-friendly **speech-to-speech translation app** for real-time multilingual communication. Speak in one language, get instant translation spoken back in another.

---

## 🚀 Features

* **Voice Input:** Mic button to start/stop listening
* **Auto-Translate:** Speech → transcription → translation
* **Voice Output:** Play, pause, stop translated audio
* **Language Picker:** Choose input & output languages
* **Responsive UI:** Clean, modern, mobile-friendly
* **Status Indicators:** Listening, translating, speaking

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **React Speech Recognition**
* **React Text-to-Speech**
* **Tailwind CSS + shadcn/ui**
* **Lucide Icons**

---

## 📦 Setup

```bash
npm install
npm run dev
```

Add your environment variables in `.env.local` (e.g. API keys for translation).

---

## 📁 Structure

```
app/
  page.tsx          # Main UI
  actions.ts        # Translation logic
components/
  select-language/  # Language selector
```

---

## 🧩 How It Works

1. User taps mic → app listens
2. Speech is transcribed
3. App auto-translates text via `translateAction`
4. User can play the translated audio

