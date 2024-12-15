import * as React from "react"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={`block text-sm font-medium leading-6 text-gray-900 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }

