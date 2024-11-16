import { cn } from "../utils/styleUtils";

export default function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={cn(
        "bg-purple-600 hover:bg-purple-700 text-white h-10 px-6 rounded-lg transition-colors",
        className
      )}
    />
  );
}
