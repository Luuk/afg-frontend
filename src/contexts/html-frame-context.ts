import { createContext } from 'react';

export interface HTMLFrameState {
  selectedSectionID: string;
  enableEditMode: boolean;
}

export interface HTMLFrameContextType extends HTMLFrameState {
  setHTMLFrameState: (state: Partial<HTMLFrameState>) => void;
}

const HTMLFrameContext = createContext<HTMLFrameContextType>({
  selectedSectionID: 'none',
  enableEditMode: false,
  setHTMLFrameState: () => {},
});

export default HTMLFrameContext;
