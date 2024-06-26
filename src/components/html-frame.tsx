import React, { useContext, useEffect, useRef, useState } from 'react';

import GenerationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';
import { cn } from '@/lib/utils';

interface HTMLFrameProps {
  className?: string;
}

const HTMLFrame: React.FC<HTMLFrameProps> = ({ className }) => {
  const { generatedHTML, isFinished } = useContext(GenerationContext);
  const { selectedSectionID, enableEditMode, setHTMLFrameState } =
    useContext(HTMLFrameContext);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [initialized, setInitialized] = useState(false);

  const highlightElement = (id: string) => {
    if (!frameRef.current?.contentWindow) return;

    const frameDocument = frameRef.current.contentWindow.document;
    const element = frameDocument.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add(
        'bg-slate-100',
        'border-4',
        'border-slate-400',
        'rounded-xl',
        'py-4',
        'px-4',
        'mt-4'
      );
    }
  };

  useEffect(() => {
    if (!frameRef.current) return;

    setHTMLFrameState({
      htmlFrameRef: frameRef,
    });

    const frameDocument = frameRef.current.contentDocument;

    const handleClick = (event: MouseEvent) => {
      let target = event.target as HTMLElement;

      while (target && target.tagName !== 'SECTION') {
        if (target.parentElement) {
          target = target.parentElement;
        } else {
          break;
        }
      }

      if (target && target.tagName === 'SECTION') {
        const sectionId = target.getAttribute('id');
        if (sectionId) {
          setHTMLFrameState({
            selectedSectionID: sectionId,
          });
        }
      } else {
        return;
      }
    };

    if (frameDocument) {
      if (!initialized && enableEditMode) {
        frameDocument.addEventListener('click', handleClick);
        frameDocument.addEventListener('load', () => console.log('loaded'));
        setInitialized(true);
      }

      if (!enableEditMode) {
        if (selectedSectionID !== 'none') {
          setHTMLFrameState({
            selectedSectionID: 'none',
          });
        }
      }

      if (
        !frameDocument.querySelector(
          'script[src="https://cdn.tailwindcss.com"]'
        )
      ) {
        const scriptElement = frameDocument.createElement('script');
        scriptElement.src = 'https://cdn.tailwindcss.com';
        frameDocument.head.appendChild(scriptElement);
      }

      frameDocument.body.innerHTML = generatedHTML;
      frameDocument.onload && frameDocument.onload(new Event(''));

      if (enableEditMode) {
        const sections = frameDocument.querySelectorAll('section');

        sections.forEach((section) => {
          section.classList.toggle('transition-all', enableEditMode);
          section.classList.toggle('duration-500', enableEditMode);
          section.classList.toggle('hover:border-4', enableEditMode);
          section.classList.toggle('hover:rounded-xl', enableEditMode);
          section.classList.toggle('hover:py-4', enableEditMode);
          section.classList.toggle('hover:px-4', enableEditMode);
          section.classList.toggle('hover:mt-4', enableEditMode);
          if (!enableEditMode) {
            section.classList.remove(
              'bg-slate-100',
              'border-4',
              'border-slate-300',
              'rounded-xl',
              'py-4',
              'px-4',
              'mt-4'
            );
          }
        });
      }
    }

    if (selectedSectionID && enableEditMode) {
      highlightElement(selectedSectionID);
    }
  }, [
    generatedHTML,
    selectedSectionID,
    initialized,
    isFinished,
    enableEditMode,
  ]);

  return (
    <>
      <div
        className={cn(
          'absolute left-1/2 top-2 z-10 -translate-x-1/2 transform rounded-b-md bg-slate-900 px-4 py-2 text-white transition-all',
          enableEditMode ? 'opacity-100' : 'opacity-0'
        )}
      >
        Edit Mode
      </div>
      <iframe
        className={cn(
          `relative rounded-md border border-slate-200 transition-all ${className}`,
          enableEditMode && 'border-4 border-primary'
        )}
        ref={frameRef}
      ></iframe>
    </>
  );
};

export default HTMLFrame;
