import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as motion from "motion/react-client";
import Image from "next/image";
import image1 from "@/public/images/isa-macouzet-72GwiojCwoI-unsplash.jpg";
import image2 from "@/public/images/image.png";
import { FaXTwitter } from "react-icons/fa6";

const Landing = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-4rem)] py-8 md:py-0 gap-8 md:gap-12 lg:gap-20 px-4">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col justify-center text-center md:text-left w-full md:w-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            Hi, I&apos;m <br className="hidden sm:block" /> Mohtasham
          </h1>
          <div className="flex justify-center md:justify-start space-x-6 mt-4 sm:mt-6">
            <a
              href="https://github.com/MohtashamMurshid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl sm:text-3xl md:text-4xl hover:text-gray-500 transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohtashammurshid/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl sm:text-3xl md:text-4xl hover:text-blue-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/MohtashamCodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl sm:text-3xl md:text-4xl hover:text-gray-500 transition-colors"
              aria-label="Twitter Profile"
            >
              <FaXTwitter />
            </a>
          </div>
        </motion.div>

        {/* Kashmir and Taylor's University Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center md:text-left max-w-sm sm:max-w-md md:max-w-lg"
        >
          <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
            I am a Software Engineer and a computer science student from{" "}
            <span className="relative group inline-block">
              <a
                className="cursor-pointer text-green-500 hover:text-green-900 transition-colors"
                href="https://en.wikipedia.org/wiki/Kashmir"
              >
                Kashmir
              </a>
              <div className="absolute hidden group-hover:block w-[280px] sm:w-[320px] md:w-[360px] -left-1/2 sm:left-1/2 transform sm:-translate-x-1/2 mt-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg rounded-md p-3">
                <Image
                  src={image1}
                  alt="Kashmir"
                  width={400}
                  height={300}
                  className="rounded-md w-full h-auto"
                />
                <p className="text-xs sm:text-sm mt-2 text-gray-700 dark:text-gray-300">
                  Kashmir, known as &quot;Paradise on Earth,&quot; is famous for
                  its beautiful valleys, scenic landscapes, and rich cultural
                  heritage.
                </p>
              </div>
            </span>
            , studying at{" "}
            <span className="relative group inline-block">
              <a
                className="text-red-600 hover:text-red-800 transition-colors"
                href="https://university.taylors.edu.my/en.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taylor&apos;s University{" "}
              </a>
              <div className="absolute hidden group-hover:block w-[280px] sm:w-[320px] md:w-[360px] -left-1/2 sm:left-1/2 transform sm:-translate-x-1/2 mt-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg rounded-md p-3">
                <Image
                  src={image2}
                  alt="Taylor's University Preview"
                  width={400}
                  height={300}
                  className="rounded-md w-full h-auto"
                />
                <p className="text-xs sm:text-sm mt-2 text-gray-700 dark:text-gray-300">
                  Taylor&apos;s University is a private university in Subang
                  Jaya, Selangor, Malaysia. It is Malaysia&apos;s top private
                  university based on the QS World University Rankings.
                </p>
              </div>
            </span>
            in Malaysia.
          </h2>
        </motion.div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Landing;
