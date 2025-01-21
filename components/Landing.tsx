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
      <section className="flex flex-col md:flex-row justify-center items-center h-screen gap-12 md:gap-20 px-4">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-semibold">
            Hi, I&apos;m <br /> Mohtasham
          </h1>
          <div className="flex justify-center md:justify-start space-x-6 mt-6">
            <a
              href="https://github.com/MohtashamMurshid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl hover:text-gray-500 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohtashammurshid/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/MohtashamCodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl hover:text-gray-500 transition-colors"
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
          className="text-center md:text-left "
        >
          <h2 className="text-lg md:text-xl font-semibold">
            I am a Software Engineer and a computer science student from{" "}
            <span className="relative group">
              <a
                className="cursor-pointer text-green-500 hover:text-green-900"
                href="https://en.wikipedia.org/wiki/Kashmir"
              >
                Kashmir
              </a>
              <div className="absolute hidden group-hover:block w-64 md:w-72 top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white border dark:bg-black border-gray-200 dark:border-gray-800 shadow-lg rounded-md p-2 ">
                <Image
                  src={image1}
                  alt="Kashmir"
                  width={300}
                  height={200}
                  className="rounded-md"
                />
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  Kashmir, known as &quot;Paradise on Earth,&quot; is famous for
                  its beautiful valleys, scenic landscapes, and rich cultural
                  heritage.
                </p>
              </div>
            </span>
            , studying at{" "}
            <span className="relative group">
              <a
                className="text-red-600 hover:text-red-800 transition-colors"
                href="https://university.taylors.edu.my/en.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taylor&apos;s University{" "}
              </a>
              <div className="absolute hidden group-hover:block w-64 md:w-72 top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white border dark:bg-black border-gray-200 dark:border-gray-800 shadow-lg rounded-md p-2 ">
                <Image
                  src={image2}
                  alt="Taylor's University Preview"
                  width={300}
                  height={200}
                  className="rounded-md"
                />
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
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
