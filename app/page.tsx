"use client";

import { useCallback, useEffect, useState } from "react";
import { translateAction } from "./actions";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SelectLanguage from "@/components/select-language";
import { Button } from "@/components/ui/button";
import { useSpeech } from "react-text-to-speech";

import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  RotateCcw,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState("en-US");
  const [outputLanguage, setOutputLanguage] = useState("en-US");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const { speechStatus, start, pause, stop } = useSpeech({
    text: translatedText,
    lang: outputLanguage,
  });

  // Translate final speech once mic stops
  const handleFinalTextUpdate = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      setIsTranslating(true);

      try {
        const translated = await translateAction({
          text,
          source: inputLanguage,
          target: outputLanguage,
        });

        if (!translated) throw new Error("Translation failed");

        setTranslatedText(translated);
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsTranslating(false);
      }
    },
    [inputLanguage, outputLanguage]
  );

  // Run translation automatically when listening stops
  useEffect(() => {
    if (!listening && transcript.trim()) {
      handleFinalTextUpdate(transcript);
    }
  }, [listening, transcript, handleFinalTextUpdate]);


  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* HEADER */}
      <header className="flex justify-center mb-3">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Languages size={30} />
          Nao Medical Translator
        </h1>
      </header>

      {/* LANGUAGE SELECTORS */}
      <section className="bg-white shadow-md p-5 rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Languages size={20} />
          Language Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm mb-1 font-medium">Input Language</p>
            <SelectLanguage
              value={inputLanguage}
              onValueChange={setInputLanguage}
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Output Language</p>
            <SelectLanguage
              value={outputLanguage}
              onValueChange={setOutputLanguage}
            />
          </div>
        </div>
      </section>

      {/* MIC SECTION */}
      <section className="text-center space-y-4">
        <p className="text-gray-600">
          Press the microphone and start speaking.
        </p>

        <Button
          className={`h-20 w-20 rounded-full shadow-lg transition-all duration-300
            ${listening ? "bg-red-500 hover:bg-red-600 scale-105" : "bg-blue-500 hover:bg-blue-600"}
          `}
          onClick={() =>
            listening
              ? SpeechRecognition.stopListening()
              : SpeechRecognition.startListening({
                  continuous: true,
                  language: inputLanguage,
                })
          }
        >
          {listening ? (
            <MicOff className="text-white size-7" />
          ) : (
            <Mic className="text-white size-7" />
          )}
        </Button>

        {
          !browserSupportsSpeechRecognition &&
          <p className="text-red-500 font-medium">
            Your browser does not support speech recognition.
          </p>
        }

        {/* STATUS */}
        {listening && (
          <p className="text-red-500 animate-pulse font-medium">
            Listening...
          </p>
        )}
        {isTranslating && (
          <p className="text-blue-500 flex items-center justify-center gap-2 font-medium">
            <Loader2 className="animate-spin" size={18} />
            Translating...
          </p>
        )}
      </section>

      {/* TEXT PANELS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SPEECH */}
        <div className="bg-gray-50 border rounded-xl p-4 h-56 overflow-auto shadow-inner">
          <p className="text-xs text-gray-500 mb-1 font-medium">Your Speech</p>
          <p className="whitespace-pre-wrap text-gray-700">
            {transcript || "Start speaking to see transcription..."}
          </p>
        </div>

        {/* TRANSLATION */}
        <div className="bg-gray-50 border rounded-xl p-4 h-56 overflow-auto shadow-inner">
          <p className="text-xs text-gray-500 mb-1 font-medium">Translation</p>
          <p className="whitespace-pre-wrap text-gray-700">
            {!translatedText && !isTranslating
              ? "Translation will appear here..."
              : isTranslating
              ? "Translating..."
              : translatedText}
          </p>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="flex flex-wrap justify-between gap-4">
        {/* Reset Transcription */}
        <Button
          variant="outline"
          onClick={resetTranscript}
          disabled={listening}
          className="flex items-center gap-2"
        >
          <RotateCcw size={18} />
          Reset Speech
        </Button>

        {/* Speech Output */}
        <div className="flex gap-3">
          {speechStatus !== "started" ? (
            <Button
              onClick={start}
              disabled={!translatedText}
              className="flex items-center gap-2"
            >
              <Volume2 size={18} /> Speak Translation
            </Button>
          ) : (
            <Button
              onClick={pause}
              className="flex items-center gap-2"
            >
              <VolumeX size={18} /> Pause
            </Button>
          )}

          <Button
            variant="destructive"
            onClick={stop}
            className="flex items-center gap-2"
          >
            Stop
          </Button>
        </div>
      </section>
    </div>
  );
}
