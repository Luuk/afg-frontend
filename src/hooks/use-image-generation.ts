import { toast } from 'sonner';

interface GenerateImageData {
  pageDescription: string;
}

const useImageGeneration = () => {
  const generateImage = async (data: GenerateImageData) => {
    let generateImageBody = {
      page_description: data.pageDescription,
      amount_of_images: 1,
    };

    try {
      return await fetch('http://127.0.0.1:8000/generate/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateImageBody),
      }).then((response) => response.json());
    } catch (error) {
      toast('An error occurred while generating images!', {
        description: 'Please try again.',
      });
    }
  };

  return { generateImage };
};

export default useImageGeneration;
