# AI Stuff

Welcome to this showcase of using pre-made AI models to build powerful AI applications, with the combined strengths of Hugging Face and ElevenLabs in this case.

- [Hugging Face](https://huggingface.co/): A leading provider of Natural Language Processing (NLP) tools and pre-trained AI models.

- [ElevenLabs](https://elevenlabs.io): Specializes in AI voice intelligence, offering lifelike text-to-speech synthesis and voice cloning technologies.

> This project was inspired by the Sophomore AI track offered by Learn Web3.

Take a look at a deployed and functioning version: [AI Stuff]()

## Project description

This project shows you how to use pre-trained AI models for:

- **Object Detection**: Use [Facebook's DEtection TRansformer (DETR) model](https://huggingface.co/facebook/detr-resnet-50-panoptic) to identify objects within images.
- **Stable Diffusion Image Generation**: Generate high-quality images from text prompts using a [stable diffusion model from Runwayml](https://huggingface.co/runwayml/stable-diffusion-v1-5).
- **AI-Generated Audio**: Transform text into lifelike speech with advanced text-to-speech synthesis, leveraging ElevenLabs' vocal emotion and intonation expertise.

Feel free to explore and contribute to this repository to make the most out of these AI tools.

## Quickstart

Clone this repository

```sh
git clone https://github.com/soos3d/ai-stuff-huggingface-elevenlabs.git
```

Go into the `ai-stuff` directory and install dependencies

```sh
cd ai-stuff && npm ci
```

Rename `.env.example` to .env and add your API keys

```env
HUGGINGFACE_API_KEY="YOUR_HUGGINGFACE_KEY"
II_API_KEY="YOUR_ELEVEN_LABS_KEY"
```

Go on ElevenLabs and [create new voices](https://elevenlabs.io/voice-lab)

Run the app

```sh
npm run dev
```
