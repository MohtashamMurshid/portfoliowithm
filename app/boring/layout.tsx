import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider";

const sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function BoringLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${sans.className} min-h-screen bg-background text-foreground transition-colors duration-300`}>
        <Link
          href="/"
          className="fixed right-4 top-4 z-50 border border-border bg-background/90 px-3 py-2 text-xs font-semibold backdrop-blur transition-opacity hover:opacity-70"
        >
          View field report ↗
        </Link>
        <div className="fixed bottom-4 right-4 z-50">
          <ModeToggle />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
}
