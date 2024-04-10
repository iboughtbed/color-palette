"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
}

export function copyToClipboard(value: string) {
  void navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  text,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "relative z-10 items-center hover:bg-zinc-700 hover:text-zinc-50",
        className,
      )}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="mr-2 size-4" />
      ) : (
        <CopyIcon className="mr-2 size-4" />
      )}
      {text ?? "Link"}
    </Button>
  );
}
