import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
import SplashCursor from "@/components/ui/splashcursor";

export const metadata = {
  title: "Portfolio | Developer & Designer",
  description: "Personal portfolio showcasing my projects and skills",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <SplashCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
