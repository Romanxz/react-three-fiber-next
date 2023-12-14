import React, { useEffect, useMemo, useState } from 'react';
import { Button, Stack, ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const R3FApp = dynamic(() => import('../imports/react/app'), { ssr: false })

export default function Page() {
  return (
    <ChakraProvider>
      <R3FApp />
    </ChakraProvider>
  );
}
