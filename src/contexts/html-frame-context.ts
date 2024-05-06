import React, { createContext } from 'react';

export interface HTMLFrameState {
  selectedSectionID: string;
  enableEditMode: boolean;
  htmlFrameRef: React.RefObject<HTMLIFrameElement> | null;
}

export interface HTMLFrameContextType extends HTMLFrameState {
  setHTMLFrameState: (state: Partial<HTMLFrameState>) => void;
}

const HTMLFrameContext = createContext<HTMLFrameContextType>({
  selectedSectionID: 'none',
  enableEditMode: false,
  setHTMLFrameState: () => {},
  htmlFrameRef: null,
});

export default HTMLFrameContext;
