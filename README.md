Here is a clean, professional, developer-friendly **README.md** tailored for your speech-to-speech translation app.
It clearly explains features, tech stack, setup, usage, and architecture.

---

# 🗣️✨ Nao Medical Voice Translator

A real-time **speech-to-speech translation** app built for fast multilingual communication.
Speak in any language → transcribed → translated → spoken back in the target language.

This project is ideal for **medical workflows**, **patient–provider communication**, and **hands-free interpreting**.

---

## 🚀 Features

### 🎤 **Voice Input**

* Start/stop listening using a microphone button
* Real-time transcription with `react-speech-recognition`
* Automatic translation after speech ends

### 🌐 **Language Selection**

* Choose input & output languages
* Powered by a modular translation action (server-side)

### 🔊 **Voice Output**

* Text-to-speech via `react-text-to-speech`
* Play, pause, and stop translation playback
* Adjustable voice based on output language

### 🧠 **Smart Flow**

* Recording → Transcription → Automatic Translation → Audio Playback
* Indicators for listening, translating, and speaking
* Error handling built in

### 🎨 **Modern UI/UX**

* Icons from `lucide-react`
* Responsive layout
* Clean panels for speech & translation
* Clear call-to-action buttons
* Accessible controls and states

---

## 🛠️ Tech Stack

| Category           | Technology                                 |
| ------------------ | ------------------------------------------ |
| Core Framework     | **Next.js 13+ (App Router)**               |
| Styling            | **Tailwind CSS**, shadcn/ui components     |
| Speech Recognition | `react-speech-recognition`                 |
| Text-to-Speech     | `react-text-to-speech`                     |
| Icons              | `lucide-react`                             |
| Server Actions     | Next.js Server Actions (`translateAction`) |
| TypeScript         | Fully typed for reliability                |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/voice-translator-app.git
cd voice-translator-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables (required)

Create a `.env.local` file:

```
# Example
OPENAI_API_KEY=your_api_key_here
```

*(Adjust based on your translation provider)*

### 4. Run development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
src/
│
├── app/
│   ├── page.tsx            # Main UI logic
│   ├── actions.ts          # translateAction server function
│   └── ...
│
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── select-language.tsx # Language dropdown
│
└── styles/
    └── globals.css
```

---

## 🔧 How It Works

### 1️⃣ Speech Recognition (Client)

* Uses `react-speech-recognition`
* Converts voice → text
* Triggers translation once user stops speaking

### 2️⃣ Translation (Server)

* `translateAction` receives text, source, and target languages
* Returns translated string

### 3️⃣ Speech Synthesis (Client)

* Uses `react-text-to-speech`
* Plays translated audio in selected output language

---

## 🧪 Development Tips

### Reset transcription

Use the “Reset Speech” button without clearing translation.

### Modify translation provider

Edit `/src/app/actions.ts` to plug in:

* **OpenAI**
* **Google Translate**
* **DeepL**
* or any custom API.

### Stop infinite translations

Debouncing built into auto-translate ensures efficient use.

---

## 🛡️ Error Handling

The app gracefully handles:

* Speech recognition failures
* Translation API errors
* Network issues
* Empty input or output

Alerts notify the user when something goes wrong.

---

## 📱 Responsiveness

* Fully responsive on mobile, tablet, and desktop.
* Large mic button for small screens.
* Flexible layout for text panels and controls.

---

## 🧰 Future Improvements (Optional)

* History of translations
* Language auto-detect
* Offline mode
* Waveform visualization during speech
* More advanced animations (Framer Motion)

---

## 🤝 Contributing

Pull requests are welcome!
Please open an issue if you’d like to propose enhancements or bug fixes.

---

## 📝 License

MIT License — free to use, modify, and distribute.

---

If you'd like, I can also create:
✅ A polished **project logo**
✅ A **demo GIF** for the README
✅ A **deployment guide** (Vercel, Netlify, etc.)

Just let me know!
