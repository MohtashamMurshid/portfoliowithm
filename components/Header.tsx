import DynamicHeading from "@/components/DynamicHeading";
import SocialLinks from "@/components/SocialLinks";

interface HeaderProps {
  names: string[];
  subtitle: string;
  description: string;
  pastExperience: string;
  githubUrl: string;
  linkedinUrl: string;
}

const Header = ({
  names,
  subtitle,
  description,
  pastExperience,
  githubUrl,
  linkedinUrl,
}: HeaderProps) => {
  return (
    <header className="h-screen relative overflow-hidden">
      {/* Book spine shadow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-black/10 transform -translate-x-1/2"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-black/5 transform -translate-x-1/2"></div>
      </div>

      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
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

      {/* Main content container - Open Book Layout */}
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <div className="w-full max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-full">
            {/* Left Page - Notebook with handwriting */}
            <div className="book-page book-page-left notebook-paper p-12 relative hover-lift page-turn">
              <div className="manuscript-corner"></div>

              {/* Page number */}
              <div className="absolute bottom-6 right-8 text-muted-foreground text-sm opacity-60 handwriting">
                Page 1
              </div>

              {/* Decorative line */}
              <div className="decorative-line mb-8"></div>

              <div className="text-center lg:text-left space-y-8 h-full flex flex-col justify-center">
                <div className="writing">
                  <DynamicHeading names={names} />
                </div>

                <div className="space-y-6 writing">
                  <p className="handwriting-casual text-muted-foreground italic text-xl leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                <div className="writing">
                  <SocialLinks
                    githubUrl={githubUrl}
                    linkedinUrl={linkedinUrl}
                  />
                </div>

                <div className="space-y-8 writing">
                  <p className="handwriting text-lg leading-relaxed ink-shadow drop-cap">
                    {description}
                  </p>
                  <p className="handwriting-casual text-muted-foreground italic text-base">
                    {pastExperience}
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="decorative-line mt-8"></div>
            </div>

            {/* Right Page - Notebook with illustration */}
            <div className="book-page book-page-right notebook-paper p-12 relative hover-lift page-turn">
              <div className="manuscript-corner"></div>

              {/* Page number */}
              <div className="absolute bottom-6 right-8 text-muted-foreground text-sm opacity-60 handwriting">
                Page 2
              </div>

              {/* Decorative line */}
              <div className="decorative-line mb-8"></div>

              <div className="text-center h-full flex flex-col justify-center">
                <div className="illustration-frame p-6 mb-8 writing">
                  <img
                    src="/image.png"
                    alt="Renaissance anatomical study with Fibonacci spiral"
                    className="w-3/4 h-auto rounded-lg mx-auto dark:invert"
                  />
                </div>
                <p className="handwriting-casual text-muted-foreground italic text-sm shimmer">
                  Anatomical Study with Golden Ratio
                </p>

                {/* Additional decorative text */}
                <div className="mt-8 space-y-4 writing">
                  <p className="handwriting text-muted-foreground text-sm leading-relaxed">
                    &ldquo;The study of proportion and harmony in nature reveals
                    the divine geometry that governs all creation.&rdquo;
                  </p>
                  <p className="handwriting-casual text-muted-foreground italic text-xs">
                    — Leonardo da Vinci
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="decorative-line mt-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating quill pen decoration */}
      <div className="absolute top-12 right-12 opacity-30 float">
        <img src="/quill-pen.svg" alt="Quill pen" className="w-16 h-16" />
      </div>
    </header>
  );
};

export default Header;
