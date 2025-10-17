import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Hugging Face Stable Diffusion!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Using Hugging Face's free Stable Diffusion API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', errorText);
      throw new Error(`Failed to generate image: ${errorText}`);
    }

    // Get the image as a buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Convert to base64
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    res.status(200).json({ photo: base64Image });

  } catch (error) {
    console.error('Image Generation Error:', error);
    res.status(500).send(error?.message || 'Something went wrong with image generation');
  }
});

export default router;