'use client'

import useReactResponsive from "@/hooks/useReactResponsive";
import dynamic from "next/dynamic";

const MobileNavigation = dynamic(() => import('./mobile/MobileNavigation'), { ssr: false });
const DesktopNavigation = dynamic(() => import('./desktop/DesktopNavigation'), { ssr: false });

export default function Navigation() {
  const { isDesktop } = useReactResponsive();

  const renderContent = () => {
    if (isDesktop) return <DesktopNavigation />;

    return <MobileNavigation />;
  }

  return renderContent()
}