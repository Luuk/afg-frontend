'use client';

import React from 'react';
import DownloadHTMLButton from '@/components/download-html-button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import GenerateButton from '@/components/generate-button';
import ComboBox from '@/components/ui/combobox';
import { templateOptions } from '@/lib/template-options';
import { toneOfVoiceOptions } from '@/lib/tone-of-voice-options';
import GenerationProgressBar from '@/components/generation-progress-bar';

interface InstructionsFormProps {
  onSubmit: SubmitHandler<any>;
  isLoadingImages: boolean;
  isLoadingHTML: boolean;
  isFinished: boolean;
  response: string;
  className?: string;
}

const InstructionsForm: React.FC<InstructionsFormProps> = ({
  onSubmit,
  isLoadingImages,
  isLoadingHTML,
  isFinished,
  response,
  className,
}) => {
  const formClassName = `space-y-8 ${className}`;
  const form = useForm({
    defaultValues: {
      pageDescription:
        'An upcoming easter event with a brunch and bingo that will be on the 26th of March. The lunch will take ' +
        'place at 12:00 at iO Digital. The bingo starts at 12:15, 3 rounds will be played and will take around 45 minutes.',
      template: 'none',
      amountOfImages: 0,
      toneOfVoice: 'none',
    },
  });

  return (
    <div className={formClassName}>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='pageDescription'
              render={({ field }) => (
                <FormItem>
                  <Label>Input</Label>
                  <Textarea {...field} placeholder='Page Description' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid gap-4 lg:grid-cols-3 lg:gap-20'>
              <FormField
                control={form.control}
                name='template'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <Label>Template</Label>
                    <div>
                      <ComboBox
                        label='Templates'
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
                    <Label>Images to Generate</Label>
                    <p className='text-sm'>{value} Images</p>
                    <Slider
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
            </div>
            <div className='grid grid-cols-4 items-center pt-2 md:grid-cols-5 md:gap-1'>
              <GenerateButton
                isLoadingImages={isLoadingImages}
                isLoadingHTML={isLoadingHTML}
                onClick={form.handleSubmit(onSubmit)}
              />
              {isFinished && (
                <DownloadHTMLButton
                  className='ml-2'
                  htmlString={response}
                  fileName='output'
                />
              )}
              {(isLoadingHTML || isLoadingImages) && !isFinished && (
                <GenerationProgressBar
                  isLoadingImages={isLoadingImages}
                  isLoadingHTML={isLoadingHTML}
                  response={response}
                  className='col-span-2 md:col-span-4'
                />
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InstructionsForm;
