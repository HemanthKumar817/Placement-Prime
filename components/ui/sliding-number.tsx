
'use client';
import React, { useEffect, useId, useRef, useState, useLayoutEffect } from 'react';
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';

const TRANSITION = {
  type: 'spring',
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

// Custom measure hook to avoid dependency issues and fix useState null error
function useMeasure() {
  const [dimensions, setDimensions] = useState({ height: 0 });
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect) {
        setDimensions({ height: entry.contentRect.height });
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, dimensions] as const;
}

// Fix: Explicitly included 'key' in prop type definition to resolve TypeScript assignment error when component is used in JSX with a key.
function Digit({ value, place }: { value: number; place: number; key?: React.Key }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = useMotionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    initial.set(valueRoundedToPlace);
  }, [initial, valueRoundedToPlace]);

  return (
    <div className='relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums'>
      <div className='invisible'>0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

// Fix: Explicitly included 'key' in prop type definition to resolve TypeScript assignment error when component is used in JSX with a key.
function Number({ mv, number }: { mv: MotionValue<number>; number: number; key?: React.Key }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;

    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  if (!bounds.height) {
    return (
      <span ref={ref} className='invisible absolute'>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className='absolute inset-0 flex items-center justify-center'
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = '.',
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split('.');
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split('');
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  return (
    <div className='flex items-center'>
      {value < 0 && '-'}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split('').map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}
