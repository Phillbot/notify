import { useLayoutEffect, useRef } from 'react';

interface FitTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  minFontSize?: number;
  maxFontSize?: number;
  overflowHidden?: boolean;
  className?: string;
}

export function FitText({
  children,
  className,
  style,
  minFontSize = 0.5,
  maxFontSize = 2,
  overflowHidden = false,
}: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let fontSize = maxFontSize;
    const setFontSize = (size: number) => {
      text.style.fontSize = `${size}em`;
    };

    const fit = () => {
      fontSize = maxFontSize;
      setFontSize(fontSize);

      let iterations = 0;
      const maxIterations = 20;

      while (
        iterations < maxIterations &&
        fontSize > minFontSize &&
        (text.scrollWidth > container.clientWidth || text.scrollHeight > container.clientHeight)
      ) {
        fontSize -= 0.1;
        setFontSize(fontSize);
        iterations += 1;
      }
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(fit);
    mutationObserver.observe(text, { childList: true, characterData: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [minFontSize, maxFontSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        overflow: overflowHidden ? 'hidden' : undefined
      }}
    >
      <div
        ref={textRef}
        style={{ display: 'inline-block', whiteSpace: 'nowrap', lineHeight: 1.2 }}
      >
        {children}
      </div>
    </div>
  );
}
