'use client';

import React, { useContext, useEffect, useState } from 'react';
import ToggleEditModeSwitch from '@/components/toggle-edit-mode-switch';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import GenerateButton from '@/components/generate-button';
import ComboBox from '@/components/ui/combobox';
import { templateOptions } from '@/lib/template-options';
import { toneOfVoiceOptions } from '@/lib/tone-of-voice-options';
import GenerationProgressBar from '@/components/generation-progress-bar';
import useHTMLGeneration from '@/hooks/use-html-generation';
import GenerationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';
import { stylingFrameworkOptions } from '@/lib/styling-framework-options';

interface InstructionsFormProps {
  className?: string;
}

const GenerationForm: React.FC<InstructionsFormProps> = ({ className }) => {
  const { isLoadingImages, isLoadingHTML, isFinished } =
    useContext(GenerationContext);
  const { enableEditMode } = useContext(HTMLFrameContext);
  const formClassName = `space-y-8 ${className}`;
  const { generateHTML } = useHTMLGeneration();
  const form = useForm({
    defaultValues: {
      pageDescription:
        'An upcoming easter event with a brunch and bingo that will be on the 26th of March. The lunch will take ' +
        'place at 12:00 at iO Digital. The bingo starts at 12:15, 3 rounds will be played and will take around 45 minutes.',
      template: 'none',
      amountOfImages: [0],
      toneOfVoice: 'none',
      stylingFramework: 'css',
    },
  });

  const [originalPageDescription, setOriginalPageDescription] =
    useState<string>(form.getValues('pageDescription'));

  useEffect(() => {
    if (enableEditMode) {
      form.setValue('pageDescription', '');
    } else {
      form.setValue('pageDescription', originalPageDescription);
    }
  }, [enableEditMode, form, originalPageDescription]);

  return (
    <div className={formClassName}>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(generateHTML)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='pageDescription'
              render={({ field }) => (
                <FormItem>
                  <Label>Input</Label>
                  <Textarea {...field} placeholder='Description' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid gap-4 lg:grid-cols-4 lg:gap-5'>
              <FormField
                control={form.control}
                name='template'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <Label className={enableEditMode ? 'text-black/20' : ''}>
                      Template
                    </Label>
                    <div>
                      <ComboBox
                        label='Templates'
                        disabled={enableEditMode}
                        items={templateOptions}
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amountOfImages'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <Label className={enableEditMode ? 'text-black/20' : ''}>
                      Images to Generate
                    </Label>
                    <p
                      className={`text-sm ${enableEditMode && 'text-black/20'}`}
                    >
                      {value} Images
                    </p>
                    <Slider
                      disabled={enableEditMode}
                      defaultValue={[0]}
                      min={0}
                      max={5}
                      step={1}
                      onValueChange={onChange}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='toneOfVoice'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <Label>Tone of Voice</Label>
                    <div>
                      <ComboBox
                        label='Tone of Voice'
                        items={toneOfVoiceOptions}
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='stylingFramework'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <Label className={enableEditMode ? 'text-black/20' : ''}>
                      Styling Framework
                    </Label>
                    <div>
                      <ComboBox
                        disabled={enableEditMode}
                        label='Styling Framework'
                        items={stylingFrameworkOptions}
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className='grid auto-rows-max grid-cols-2 items-center gap-1 pt-2 md:gap-2 lg:grid-cols-5'>
              <GenerateButton />
              {!isLoadingHTML && !isLoadingImages && isFinished && (
                <ToggleEditModeSwitch />
              )}
              {isLoadingHTML ||
                (isLoadingImages && (
                  <GenerationProgressBar className='col-span-2 md:col-span-4' />
                ))}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GenerationForm;
