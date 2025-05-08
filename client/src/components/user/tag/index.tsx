import type { ReactNode } from "react";

interface TagProps{
    children: ReactNode
}

export function Tag({children}: TagProps) {
  return (
    <span className="select-none inline-flex items-center px-2 py-1 rounded bg-neutral-200 text-neutral-800">
      {children}
    </span>
  );
}
