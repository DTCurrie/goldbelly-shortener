import { ComponentPropsWithoutRef } from 'react';
import { SWRConfig } from 'swr';

export const SwrWrapper = ({ children }: ComponentPropsWithoutRef<'div'>) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    {children}
  </SWRConfig>
);
