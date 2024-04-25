import { useContext } from 'react';
import { toast } from 'sonner';
import GenerationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';

interface GenerateHTMLData {
  amountOfImages: number[];
  pageDescription: string;
  imageUrls?: string[];
  toneOfVoice?: string;
  template?: string;
  selectedSectionID?: string;
}

const useHTMLGeneration = () => {
  const { setGenerationState, generatedHTML } = useContext(GenerationContext);
  const { setHTMLFrameState, selectedSectionID } = useContext(HTMLFrameContext);

  const generateHTML = async (data: GenerateHTMLData) => {
    const lastGeneratedHTML = generatedHTML;

    setGenerationState({
      isLoadingImages: true,
      isLoadingHTML: false,
      isLoadingHTMLSection: false,
      isFinished: false,
      generatedHTML: selectedSectionID === 'none' ? '' : lastGeneratedHTML,
    });

    let generateImageBody = {
      page_description: data.pageDescription,
      amount_of_images: data.amountOfImages[0],
    };

    let generateHTMLBody = {
      page_description: data.pageDescription,
      image_urls: undefined,
      tone_of_voice: data.toneOfVoice !== 'none' ? data.toneOfVoice : undefined,
      template_name: data.template !== 'none' ? data.template : undefined,
    };

    let regenerateHTMLSectionBody = {
      prompt: data.pageDescription,
      section_id: selectedSectionID,
      html_body: lastGeneratedHTML,
      tone_of_voice: data.toneOfVoice !== 'none' ? data.toneOfVoice : undefined,
    };

    if (selectedSectionID !== 'none') {
      const lastSelectedID = selectedSectionID;
      setHTMLFrameState({
        selectedSectionID: 'none',
        enableEditMode: false,
      });
      setGenerationState({
        isLoadingHTMLSection: true,
      });

      try {
        const sectionRegex = new RegExp(
          '<section[^>]*id="' + lastSelectedID + '"[^>]*>'
        );
        const startIndex = lastGeneratedHTML.search(sectionRegex);
        const endIndex =
          lastGeneratedHTML.indexOf('</section>', startIndex) +
          '</section>'.length;

        if (startIndex == -1 || endIndex == -1) {
          toast('An error occurred while generating HTML!', {
            description: 'Please try again.',
          });
          setGenerationState({
            isLoadingImages: false,
            isLoadingHTML: false,
            isLoadingHTMLSection: false,
            isFinished: true,
            generatedHTML: '',
          });
          return;
        }

        const res = await fetch(
          'http://127.0.0.1:8000/regenerate/html/section',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(regenerateHTMLSectionBody),
          }
        );

        if (res.body) {
          const reader = res.body.getReader();
          let htmlResponse = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const decodedValue = new TextDecoder().decode(value);
            htmlResponse += decodedValue;

            setGenerationState({
              generatedHTML:
                lastGeneratedHTML.slice(0, startIndex) +
                htmlResponse +
                lastGeneratedHTML.slice(endIndex),
            });
          }
          setGenerationState({
            isLoadingImages: false,
            isLoadingHTML: false,
            isLoadingHTMLSection: false,
            isFinished: true,
          });
          setHTMLFrameState({
            selectedSectionID: lastSelectedID,
            enableEditMode: true,
          });
        }
      } catch (error) {
        toast('An error occurred while generating HTML!', {
          description: 'Please try again.',
        });
        setGenerationState({
          isLoadingImages: false,
          isLoadingHTML: false,
          isLoadingHTMLSection: false,
          isFinished: true,
          generatedHTML: '',
        });
      }
    }

    if (data.amountOfImages[0] > 0) {
      try {
        generateHTMLBody.image_urls = await fetch(
          'http://127.0.0.1:8000/generate/images',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateImageBody),
          }
        ).then((response) => response.json());

        setGenerationState({
          isLoadingImages: false,
        });
      } catch (error) {
        toast('An error occurred while generating images!', {
          description: 'Please try again.',
        });
        setGenerationState({
          isLoadingImages: false,
          isLoadingHTML: false,
          isLoadingHTMLSection: false,
          isFinished: true,
          generatedHTML: '',
        });
      }
    }

    if (selectedSectionID == 'none') {
      setGenerationState({
        isLoadingHTML: true,
      });

      try {
        const res = await fetch('http://127.0.0.1:8000/generate/html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(generateHTMLBody),
        });

        if (res.body) {
          const reader = res.body.getReader();
          let htmlResponse = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const decodedValue = new TextDecoder().decode(value);
            htmlResponse += decodedValue;
            setGenerationState({
              generatedHTML: htmlResponse,
            });
          }
          setGenerationState({
            isLoadingImages: false,
            isLoadingHTML: false,
            isLoadingHTMLSection: false,
            isFinished: true,
            generatedHTML: htmlResponse,
          });
        }
      } catch (error) {
        toast('An error occurred while generating HTML!', {
          description: 'Please try again.',
        });
        setGenerationState({
          isLoadingImages: false,
          isLoadingHTML: false,
          isLoadingHTMLSection: false,
          isFinished: true,
          generatedHTML: '',
        });
      }
    }
  };

  return { generateHTML };
};

export default useHTMLGeneration;
