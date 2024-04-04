'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import DownloadHtmlButton from '@/components/download-html-button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';

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
        'An upcoming easter event with a brunch and bingo that will be on the 26th of March. The lunch will take place at 12:00 at iO Digital. The bingo starts at 12:15, 3 rounds will be played and will take around 45 minutes.',
      amountOfImages: 0,
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
            <FormField
              control={form.control}
              name='amountOfImages'
              render={({ field: { value, onChange } }) => (
                <FormItem className='max-w-96'>
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

            <div className='pt-2'>
              <Button type='submit' disabled={isLoadingHTML || isLoadingImages}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='mr-1 h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                  />
                </svg>

                {isLoadingImages
                  ? 'Generating Images...'
                  : isLoadingHTML
                    ? 'Generating HTML...'
                    : 'Generate'}
                {isLoadingHTML || isLoadingImages ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='ml-2 animate-spin'
                  >
                    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                  </svg>
                ) : null}
              </Button>
              {isFinished && (
                <DownloadHtmlButton
                  className='ml-2'
                  htmlString={response}
                  fileName='output'
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
