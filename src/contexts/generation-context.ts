import { createContext } from 'react';

export interface GenerationState {
  isLoadingImages: boolean;
  isLoadingHTML: boolean;
  isFinished: boolean;
  generatedHTML: string;
}

export interface GenerationContextType extends GenerationState {
  setGenerationState: (state: Partial<GenerationState>) => void;
}

const GenerationContext = createContext<GenerationContextType>({
  isLoadingImages: false,
  isLoadingHTML: false,
  isFinished: false,
  generatedHTML: '',
  setGenerationState: () => {},
});

export default GenerationContext;
