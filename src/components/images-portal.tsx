import { ReactPortal, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import generationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';
import { ImageRegenerateWrap } from '@/components/image-regenerate-wrap';

export const ImagesPortal = () => {
  const { isFinished } = useContext(generationContext);
  const { htmlFrameRef, enableEditMode, selectedSectionID } =
    useContext(HTMLFrameContext);
  const [portals, setPortals] = useState<ReactPortal[]>([]);

  useEffect(() => {
    if (
      isFinished &&
      htmlFrameRef &&
      htmlFrameRef.current &&
      htmlFrameRef.current.contentDocument
    ) {
      htmlFrameRef.current.contentDocument.onload = () => {
        setPortals([]);
        if (htmlFrameRef.current && htmlFrameRef.current.contentDocument) {
          const images =
            htmlFrameRef.current.contentDocument.querySelectorAll('img');
          const portals: ReactPortal[] = [];

          images.forEach((image) => {
            const newImg = (
              <img
                className={Array(image.classList).join(' ')}
                src={image.src}
                alt={image.alt}
              />
            );
            let parent = image.parentElement;
            let sectionId = null;
            while (parent) {
              if (parent.tagName === 'SECTION' && parent.id) {
                sectionId = parent.id;
                break;
              }
              parent = parent.parentElement;
            }
            if (
              enableEditMode &&
              image.parentElement &&
              sectionId === selectedSectionID
            ) {
              portals.push(
                createPortal(
                  <ImageRegenerateWrap
                    imageElement={newImg}
                    replaceWith={image}
                  />,
                  image.parentElement
                )
              );
            }
          });
          setPortals(portals);
        }
      };
    }
  }, [isFinished, htmlFrameRef, selectedSectionID, enableEditMode]);
  return <>{portals}</>;
};
