import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Item {
  value: string;
  label: string;
}

interface ComboBoxProps {
  label: string;
  items: Item[];
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  items,
  value,
  disabled,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSelect = (currentValue: string) => {
    setOpen(false);
    setCurrentValue(currentValue);
    onChange(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {currentValue
            ? items.find((item) => item.value === currentValue)?.label
            : `Select ${label.toLowerCase()}...`}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96 p-0'>
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
