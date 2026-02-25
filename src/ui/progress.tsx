import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/utils"

function Progress({
  className,
  value,
  color = "primary",
  showValue = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root > & { showValue?: boolean }) {
  return (
    <>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn("bg-primary h-full w-full flex-1 transition-all", "bg-" + color)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />

      </ProgressPrimitive.Root>
      {showValue && <div className="absolute top-3 left-0 flex items-center justify-center h-full w-full text-[10px] font-medium text-black">
        {value}%
      </div>}
    </>
  )
}

export { Progress }
