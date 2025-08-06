import React from "react";
import { Input } from "./input";
import { Eye, EyeOff, KeyRoundIcon } from "lucide-react";

export const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <div className="relative">
      <KeyRoundIcon  className="absolute top-1/2 text-gray-500 -translate-y-1/2 left-1.5" size={16}/>
      <Input
        type={showPassword ? "text" : "password"}
        className={`pl-7 ${className}`}
        placeholder="********"
        ref={ref}
        {...props}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";