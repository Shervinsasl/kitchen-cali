import type { ReactNode } from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader showBadge={false} />
      {children}
      <SiteFooter />
    </>
  );
}
