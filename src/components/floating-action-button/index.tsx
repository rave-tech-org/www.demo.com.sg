'use client';

import React, { useState } from 'react';

import { Button } from '@/lib/shadcn/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/lib/shadcn/ui/command';
import { Separator } from '@/lib/shadcn/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/shadcn/ui/tooltip';

import { AlignJustify, Blocks, Eye, Info } from 'lucide-react';

import { useRouter } from 'next/navigation';

type contentBlockSlugItem = {
  slug: string | null | undefined;
  title: string | null;
  isActive: boolean;
};

interface FloatingActionButtonInterface {
  contentBlockSlugList: contentBlockSlugItem[];
}

const FloatingActionButton = ({ contentBlockSlugList }: FloatingActionButtonInterface) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-x-4 rounded-full bg-primary p-1 shadow-xl">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="!rounded-full !shadow-none">
                <Eye />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-xl border border-accent" sideOffset={8}>
              {contentBlockSlugList
                .filter((block) => block.isActive)
                .map((item, idx) => {
                  return (
                    <div className="flex flex-col items-center gap-x-2" key={idx}>
                      <span className="p-0 text-foreground">{item.title}</span>
                      <em className="text-xs text-muted-foreground">{item.slug}</em>
                    </div>
                  );
                })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" />
        <Button className="!rounded-full !shadow-none" onClick={() => setOpen(!open)}>
          <AlignJustify />
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={() => setOpen(!open)}>
        <Command className="border">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Active Content Block">
              {contentBlockSlugList
                .filter((block) => block.isActive)
                .map((item, idx) => {
                  return (
                    <CommandItem className="cursor-not-allowed items-center" key={idx}>
                      <Info />
                      <span className="p-0">{item.title}</span>
                      <em className="text-xs text-muted-foreground">{item.slug}</em>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Available Content Block(s)">
              {contentBlockSlugList
                .filter((block) => !block.isActive)
                .map((item, idx) => {
                  return (
                    <CommandItem className="cursor-pointer items-center" key={idx}>
                      <div
                        className="flex items-center gap-x-2"
                        onClick={() => {
                          router.push(`/content-block/${item.slug}`);
                        }}
                      >
                        <Blocks />
                        <span className="p-0">{item.title}</span>
                        <em className="text-xs text-muted-foreground">{item.slug}</em>
                      </div>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default FloatingActionButton;
