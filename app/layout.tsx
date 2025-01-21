import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Open_Sans } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";

// If loading a variable font, you don't need to specify the font weight
const sans = Open_Sans({
  weight: ["400", "700", "300", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "Mohtasham's Portfolio",
  description: "Portfolio of Mohtasham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={sans.className}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed right-4 bottom-4 z-50">
              <ModeToggle />
            </div>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
