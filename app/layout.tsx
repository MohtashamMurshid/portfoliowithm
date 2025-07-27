import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Mohtasham Murshid Madani - Renaissance Portfolio",
  description:
    "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="manuscript-text">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Enhanced Renaissance decorative background elements */}
          <div className="fixed inset-0 pointer-events-none opacity-10">
            <div className="bg-decoration top-20 left-20 float"></div>
            <div
              className="bg-decoration bottom-40 right-40 float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="bg-decoration top-1/2 left-1/3 float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className="fixed right-4 bottom-4 z-50">
            <ModeToggle />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
