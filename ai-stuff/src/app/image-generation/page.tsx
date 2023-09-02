"use client";

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [thePrompt, setThePrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const generateImage = async () => {
    setIsLoading(true);
    if (!thePrompt) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt: thePrompt }),
      });

      if (response.ok) {
        console.log("Image generated successfully");
        const blob = await response.blob();

        // Check if the blob type is 'application/json'
        if (blob.type === "application/json") {
          // Convert blob to JSON and log it
          const reader = new FileReader();
          reader.onload = function () {
            console.log(
              "JSON response received:",
              JSON.parse(this.result as string)
            );
          };
          reader.readAsText(blob);
        } else {
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl);
          setApiResponse(imageUrl);
        }

        setIsLoading(false);
      } else {
        console.error("Failed to generate image");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Header /> {/* Add the Header component here */}
      <main className="flex flex-col items-center justify-between px-24 py-12">
        <section className="text-center py-20 bg-lime-200 w-full">
          <h1 className="text-4xl font-bold">AI Stuff | Generate Images</h1>
          <div className="text-xl font-semibold mt-4">
            This app uses{" "}
            <a
              className="text-violet-600"
              href="https://huggingface.co/runwayml/stable-diffusion-v1-5"
              target="_blank"
            >
              the Runway Stable Diffusion v1-5
            </a>{" "}
            model to generate images from text.
          </div>
          <p className="mt-4 pr-2 pl-2">
            Stable Diffusion offers a cutting-edge approach to generating images
            from text prompts, leveraging the principles of diffusion processes
            for stable and high-quality outputs. Unlike traditional generative
            models, it focuses on a diffusion-based mechanism that iteratively
            refines the generated image, ensuring both stability and fidelity to
            the original text prompt. This makes Stable Diffusion a compelling
            alternative for text-to-image synthesis, offering a unique blend of
            accuracy and robustness.
          </p>
        </section>

        <section className="text-center py-20 bg-white w-full">
          <div className="flex justify-center items-start">
            {/* Left Side - Text Input and Button */}
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-2">Give a promt</p>
              <form
                className="flex flex-col items-center" // Add flex-column here
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent the default form submission
                  generateImage(); // Call your function
                }}
              >
                <input
                  type="text"
                  className="border p-2 rounded-sm border-gray-400 mb-4 text-black w-96"
                  placeholder="A drawing of a cute cat on a page"
                  onChange={(event) => {
                    setThePrompt(event.target.value);
                  }}
                />
                <button
                  type="submit" // Set the button type to "submit"
                  className="bg-blue-600 px-5 py-1 rounded-sm text-white disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors"
                  disabled={isLoading || !thePrompt}
                >
                  {isLoading ? "Generating..." : "Make a cool image"}
                </button>
              </form>
            </div>

            {/* Right Side - Generated Image */}

            <div className="ml-8 w-80 h-80 relative border-2 border-dashed border-gray-400 rounded-md p-2">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
                <span className="text-gray-500">
                  Generated image will appear here
                </span>
              </div>
              {apiResponse && (
                <img
                  src={apiResponse}
                  className="object-contain absolute z-0"
                  alt="Generated"
                  onLoad={() => console.log("Image loaded")}
                  onError={(e) => {
                    console.error("Image failed to load", e);
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
