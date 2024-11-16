import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

interface LoaderProps extends PropsWithChildren {
  loaded: boolean;
  loadingText: string;
  errorText?: string;
}

export default function Loader({
  loaded,
  loadingText,
  errorText,
  children,
}: LoaderProps) {
  return (
    <div>
      {!loaded && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="text-white text-md">{loadingText}</span>
        </div>
      )}
      {errorText && <div>{errorText}</div>}
      {loaded && !errorText && children}
    </div>
  );
}
