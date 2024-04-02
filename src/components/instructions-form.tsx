'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import DownloadHtmlButton from '@/components/download-html-button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';

interface InstructionsFormProps {
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
  isFinished: boolean;
  response: string;
  className?: string;
}

const InstructionsForm: React.FC<InstructionsFormProps> = ({
  onSubmit,
  isLoading,
  isFinished,
  response,
  className,
}) => {
  const formClassName = `space-y-8 ${className}`;
  const form = useForm({
    defaultValues: {
      instructions:
        'An upcoming easter event with a brunch and bingo that will be on the 26th of March. The lunch will take place at 12:00 at iO Digital. The bingo starts at 12:15, 3 rounds will be played and will take around 45 minutes.',
    },
  });
  return (
    <div className={formClassName}>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='instructions'
              render={({ field }) => (
                <FormItem>
                  <Label>AI Experimentation</Label>
                  <Textarea placeholder='Instructions' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isLoading}>
              Generate
              {isLoading && (
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
              )}
            </Button>
            {isFinished && (
              <DownloadHtmlButton
                className='ml-2'
                htmlString={response}
                fileName='output'
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InstructionsForm;
