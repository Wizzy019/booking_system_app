import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ children, variant = 'primary', ...rest }: React.PropsWithChildren<Props>) {
  return (
    <button {...rest} className={`btn ${variant}`}>
      {children}
    </button>
  );
}
