import type { Metadata } from "next";
import "./globals.css";
import BackgroundGrainient from "@/components/BackgroundGrainient";

export const metadata: Metadata = {
  title: "Vorsha",
  description: "Vorsha Web Application",
  icons: {
    icon: "/assets/logo/colored-icon.svg",
    shortcut: "/assets/logo/colored-icon.svg",
    apple: "/assets/logo/colored-icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#120f17] text-foreground relative selection:bg-orange-500/30 selection:text-white">
        <BackgroundGrainient />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

