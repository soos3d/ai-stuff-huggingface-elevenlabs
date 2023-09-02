"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer";
interface IdentifiedObject {
  label: string;
  mask: string;
  score: number;
}

export default function Home() {
  const tooltipContent = `
  The image is sent to the API and after the response:

  In src/app/image-detection/page.tsx

  1. The 'identifyThings' function sends the image to the '/api/detect' endpoint.
  2. The API returns an array of identified objects, which is stored in 'apiResponse'.
  3. Clicking on a button triggers 'toggleThis', updating 'toShow' with the selected object.
  4. The 'toShow' state change triggers a re-render.
  5. A second <img> element is conditionally rendered to display the mask using CSS blend modes.
  `;

  const [theFile, setTheFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<IdentifiedObject[]>([]);
  const [toShow, setToShow] = useState<IdentifiedObject | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Make sure we have a file
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    // Update the state variable accordingly
    setTheFile(file);

    // Get the file's data url and set it as the image preview
    const blobUrl = URL.createObjectURL(file);
    setImagePreview(blobUrl);
  };

  const identifyThings = async () => {
    // Make sure we have a file to work with
    if (!theFile) return;

    // Start the loading indicator
    setIsLoading(true);

    // Prepare data to send to our backend
    const formData = new FormData();
    formData.set("theImage", theFile);

    try {
      // Call our backend API - which further calls Hugging Face
      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      // If the API call was successful, set the response
      if (response.ok) {
        console.log("File uploaded successfully");
        const theResponse = await response.json();
        console.log(theResponse);
        setApiResponse(theResponse.body);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }

    setIsLoading(false);
  };

  function toggleThis(label: string) {
    const showThis = apiResponse.find((obj) => obj.label === label);
    setToShow((prev: IdentifiedObject | undefined) => {
      if (prev === showThis) {
        return undefined;
      }
      return showThis || undefined;
    });
  }
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Header />
      <main className="flex flex-col items-center justify-between px-24 py-12">
        <section className="text-center py-20 bg-amber-200 w-full">
          <h1 className="text-4xl font-bold">AI Stuff | Detect Images</h1>
          <div className="text-xl font-semibold mt-4">
            This app uses{" "}
            <a
              className="text-violet-600"
              href="https://huggingface.co/facebook/detr-resnet-50-panoptic"
            >
              DEtection TRansformer (DETR)
            </a>{" "}
            model from Facebook to detect objects in images.
          </div>
          <p className="mt-4 pr-2 pl-2">
            The Facebook DEtection TRansformer (DETR) model is a novel approach
            to object detection that leverages the Transformer architecture,
            originally designed for natural language processing tasks. The
            DEtection TRansformer (DETR) model revolutionizes object detection
            by treating it as a set prediction problem, eliminating the need for
            hand-crafted components like non-maximum suppression. Utilizing a
            transformer encoder-decoder architecture and a set-based global
            loss, DETR outputs unique object predictions in parallel. The model
            is not only conceptually straightforward but also performs on par
            with established methods like Faster R-CNN. Additionally, it can be
            easily extended to tasks like panoptic segmentation, outperforming
            other competitive baselines.
          </p>
        </section>

        <section className="text-center py-5 bg-white w-full">
          <p className="text-3xl font-bold mb-5">Do AI stuff here </p>
          <div className="flex justify-center items-start">
            {/* Left Side - Image */}
            <div className="w-80 h-80 relative mb-4 border-2 border-dashed border-gray-400 rounded-md p-2">
              {/* Preview the image */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="object-contain absolute z-0"
                  alt="Preview"
                />
              )}

              {/* Show the masked image if an identified object is selected */}
              {toShow && (
                <img
                  src={`data:image/png;base64,${toShow.mask}`}
                  className="object-contain absolute z-20 mix-blend-screen invert"
                  alt="Mask"
                />
              )}
            </div>

            {/* Right Side - Button and Results */}
            <div className="ml-8 flex flex-col">
              <p className="font-semibold mb-2">Upload an image</p>
              {/* Upload Image Widget */}
              <input
                type="file"
                className="border p-2 rounded-sm border-gray-400 mb-4"
                onChange={handleFileChange}
                accept="image/*"
              />

              {/* Detect Button */}
              {theFile && (
                <button
                  className="bg-blue-600 px-5 py-1 rounded-sm text-white disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors mb-4"
                  onClick={identifyThings}
                  disabled={isLoading}
                >
                  {isLoading ? "Doing AI stuff..." : "Detect!"}
                </button>
              )}

              {/* Identified Objects */}
              {apiResponse && (
                <div className="mt-4 bg-amber-200 p-4 rounded-md relative">
                  <div className="text-lg mb-4">Identified objects:</div>
                  <div className="flex flex-wrap">
                    {apiResponse.map((e) => (
                      <div className="mx-2 mb-2 relative" key={e.label}>
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded-md"
                          onClick={() => toggleThis(e.label)}
                        >
                          {e.label}
                        </button>
                        <div className="tooltip hidden absolute top-0 left-0 z-50 p-2 bg-gray-700 text-white rounded">
                          Score: {e.score}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 right-0">
                    <div className="info-icon hover-trigger text-blue-600 cursor-pointer mr-5 mt-2">
                      How does it work?
                    </div>
                    <div className="code-tooltip hidden absolute top-0 right-0 z-50 p-2 bg-gray-700 text-white rounded">
                      {tooltipContent}
                    </div>
                  </div>
                  <p className="mt-4 pr-2 pl-2">
                    Note that this app is a proof of concept and will miss some
                    objects sometimes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
