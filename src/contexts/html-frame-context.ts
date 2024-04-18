import { createContext } from 'react';

export interface HTMLFrameState {
  selectedSectionID: string;
}

export interface HTMLFrameContextType extends HTMLFrameState {
  setHTMLFrameState: (state: Partial<HTMLFrameState>) => void;
}

const HTMLFrameContext = createContext<HTMLFrameContextType>({
  selectedSectionID: 'none',
  setHTMLFrameState: () => {},
});

export default HTMLFrameContext;
