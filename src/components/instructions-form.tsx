'use client';

import React, { useState } from 'react';
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
                  <Label>Page Description</Label>
                  <Textarea {...field} />
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
                  <p>{value} Images</p>
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
