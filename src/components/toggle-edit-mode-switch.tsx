import React, { useContext } from 'react';
import HTMLFrameContext from '@/contexts/html-frame-context';
import { Toggle } from '@/components/ui/toggle';
import Image from 'next/image';
import Check from '../../public/svg/check.svg';

const ToggleEditModeSwitch = () => {
  const { enableEditMode, setHTMLFrameState } = useContext(HTMLFrameContext);

  return (
    <Toggle
      variant='outline'
      pressed={enableEditMode}
      onClick={() => setHTMLFrameState({ enableEditMode: !enableEditMode })}
    >
      {enableEditMode && (
        <Image src={Check} className='mr-2 h-5 w-5' alt='Download' />
      )}
      Edit Mode
    </Toggle>
  );
};

export default ToggleEditModeSwitch;
