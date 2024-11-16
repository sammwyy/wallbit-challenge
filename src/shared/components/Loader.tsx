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
      {!loaded && <div>{loadingText}</div>}
      {errorText && <div>{errorText}</div>}
      {loaded && !errorText && children}
    </div>
  );
}
