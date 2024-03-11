'use client'

import { useMediaQuery } from "react-responsive";

const useReactResponsive = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  });

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)'
  });

  return {
    isDesktop,
    isMobile,
  }
}

export default useReactResponsive