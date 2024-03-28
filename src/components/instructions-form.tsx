'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';

interface DashboardFormProps {
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
  className?: string;
}

const InstructionsForm: React.FC<DashboardFormProps> = ({
  onSubmit,
  isLoading,
  className,
}) => {
  const formClassName = `space-y-8 ${className}`;
  const form = useForm({
    defaultValues: {
      instructions:
        'Page about an upcoming easter event with a brunch and bingo.',
    },
  });
  return (
    <div className={formClassName}>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <Label>AI Experiment</Label>
            <FormField
              control={form.control}
              name='instructions'
              render={({ field }) => (
                <FormItem>
                  <Input placeholder='Instructions' {...field} />
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InstructionsForm;
