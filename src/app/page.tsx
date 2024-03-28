'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  instructions: z.string().min(2, {
    message: 'Instructions must be at least 2 characters.',
  }),
});

export default function Home() {
  const [response, setResponse] = useState<string>('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instructions: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setResponse('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Log the stream data
    if (res.body) {
      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = new TextDecoder().decode(value);
        setResponse((response) => response + decodedValue);
      }
    }
  }

  return (
    <div className='mx-auto max-w-96 space-y-8'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <Label>AI Experiment</Label>
            <FormField
              control={form.control}
              name='instructions'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Instructions' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Generate</Button>
          </form>
        </Form>
      </div>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
}
