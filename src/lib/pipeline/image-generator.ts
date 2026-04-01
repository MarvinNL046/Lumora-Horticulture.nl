// lib/pipeline/image-generator.ts

import fs from 'fs';
import path from 'path';

const GEMINI_TIMEOUT_MS = 60_000;

type Category = 'kweektechnieken' | 'duurzaamheid' | 'producten' | 'tips';

const CATEGORY_STYLES: Record<Category, string> = {
  kweektechnieken:
    'professional greenhouse interior with young seedlings in propagation trays, modern horticulture setup, natural lighting',
  duurzaamheid:
    'sustainable green farming concept, compostable plant trays, eco-friendly horticulture materials, earth tones',
  producten:
    'horticultural supplies close-up, growing trays and plugs, professional propagation equipment, clean product photography',
  tips:
    'professional grower hands working with young plant cuttings, greenhouse workspace, practical horticulture',
};

/**
 * Generate a blog header image using Gemini 3.1 Flash and save to filesystem.
 * Returns the public path (e.g. `/images/blog/my-slug.webp`).
 */
export async function generateBlogImage(
  slug: string,
  title: string,
  category: string
): Promise<string> {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'blog');
  const outputPath = path.join(outputDir, `${slug}.webp`);
  const publicPath = `/images/blog/${slug}.webp`;

  // Skip if image already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Image already exists: ${publicPath}`);
    return publicPath;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set — skipping image generation');
    return '';
  }

  const style = CATEGORY_STYLES[category as Category] || CATEGORY_STYLES.kweektechnieken;
  const prompt = `Create a photorealistic blog header image for a professional horticulture article titled "${title}". Style: ${style}. The image should look professional, modern, and suitable for a B2B horticultural company website. No text or watermarks in the image.`;

  try {
    // Call Gemini 3.1 Flash image generation
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT'],
            imageSizeOptions: {
              aspectRatio: '16:9',
            },
          },
        }),
        signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // Extract image data from response
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part: { inlineData?: { mimeType: string; data: string } }) => part.inlineData?.mimeType?.startsWith('image/')
    );

    if (!imagePart?.inlineData?.data) {
      throw new Error('No image data in Gemini response');
    }

    const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64');

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Resize to 1200x630 webp using sharp (with fallback)
    try {
      const sharp = (await import('sharp')).default;
      await sharp(imageBuffer)
        .resize(1200, 630, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(outputPath);
    } catch {
      // Fallback: save raw image if sharp is not available
      console.warn('sharp not available — saving raw image as webp');
      fs.writeFileSync(outputPath, imageBuffer);
    }

    console.log(`Blog image generated: ${publicPath}`);
    return publicPath;
  } catch (err) {
    console.error('Image generation failed:', (err as Error).message);
    return '';
  }
}
