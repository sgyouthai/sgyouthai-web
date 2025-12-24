import * as React from "react";
import { Button } from "@/components/ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;

export default function CustomButton({
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={`${className ?? ""}`} {...props}>
      {children}
    </Button>
  );
}
