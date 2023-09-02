"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer"; // Import the Footer component

export interface VoiceObject {
  available_for_tiers: string[];
  category: string;
  description: string;
  name: string;
  voice_id: string;
}

export default function Home() {
  const [theText, setTheText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [arrayOfVoices, setArrayOfVoices] = useState<
    Array<VoiceObject> | undefined
  >();
  const [theVoiceId, setTheVoiceId] = useState<string | undefined>();
  const [theAudio, setTheAudio] = useState<string | undefined>();

  async function getGeneratedVoices() {
    const getResponse = await fetch("/api/audio", {
      method: "GET",
    });

    if (getResponse.ok) {
      const tempGenVoices = await getResponse.json();
      console.log(tempGenVoices);
      setArrayOfVoices(tempGenVoices.body);
      console.log(arrayOfVoices);
    }
  }

  useEffect(() => {
    getGeneratedVoices();
    console.log(arrayOfVoices);
  }, []);

  useEffect(() => {
    console.log(theVoiceId);
  }, [theVoiceId]);
  useEffect(() => {
    console.log(arrayOfVoices);
  }, [arrayOfVoices]);

  async function generateSpeech() {
    if (!theText || !theVoiceId) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/audio", {
        method: "POST",
        body: JSON.stringify({ text: theText, voiceId: theVoiceId }),
      });

      if (response.ok) {
        console.log("Speech generated successfully");
        const theResponse = await response.blob();
        setTheAudio(URL.createObjectURL(theResponse));
      } else {
        console.error("Failed to generate speech");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Header />
      <main className="flex flex-col items-center justify-between px-24 py-12">
        <section className="text-center py-10 bg-cyan-200 w-full">
          <h1 className="text-4xl font-bold">
            AI Stuff | Generate audio from text
          </h1>
          <div className="text-lg mt-4">
            This app interacts with the{" "}
            <a
              className="text-purple-400"
              href="https://docs.elevenlabs.io/api-reference/"
              target="_blank"
            >
              Eleven Labs API{" "}
            </a>
            to generate audio from text. Go on the{" "}
            <a
              className="text-purple-400"
              href="https://elevenlabs.io/voice-lab"
              target="_blank"
            >
              Eleven Labs website
            </a>{" "}
            to generate voices to use in this app!
            <p className="mt-2">
              ElevenLabs specializes in AI voice intelligence, offering a range
              of products that leverage advanced algorithms for text-to-speech
              synthesis and voice cloning. Their flagship product, Speech
              Synthesis, produces lifelike speech by analyzing the emotional
              context of the text and adjusting vocal intonation accordingly.{" "}
            </p>
          </div>
        </section>

        <section className="text-center py-5 bg-white w-full">
          <div className="w-full items-center flex flex-col gap-2 mt-2">
            <div className="w-full">
              <div className="text-center">Choose a voice</div>
              <div className="w-full flex justify-center">
                {arrayOfVoices ? (
                  <div className="flex gap-4">
                    {arrayOfVoices.map((e: VoiceObject) => (
                      <button
                        className={`border ${
                          theVoiceId === e.voice_id ? "bg-lime-400" : ""
                        } px-2 my-2 rounded-sm py-1`}
                        onClick={() => setTheVoiceId(e.voice_id)}
                        key={e.voice_id}
                      >
                        {e.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  "Loading AI voices..."
                )}
              </div>
            </div>

            <textarea
              className="p-1 w-[40rem] text-black bg-gray-100 border-2 border-gray-400 rounded-sm"
              placeholder="Talk to me like you are a real person!"
              onChange={(event) => {
                setTheText(event.target.value);
              }}
            />

            <button
              className="bg-blue-600 text-white px-5 mt-2 py-1 self-center h-max rounded-sm hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors"
              onClick={generateSpeech}
              disabled={isLoading || !theText}
            >
              {isLoading ? "AI-ing..." : "Voice me!"}
            </button>
          </div>
        </section>

        <section className="text-center py-10 bg-cyan-200 w-full">
          <p className="">The result will show up here</p>
          <div className="flex justify-center items-center w-full h-20">
            {theAudio && (
              <audio controls src={theAudio}>
                Your browser does not support the audio tag
              </audio>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
