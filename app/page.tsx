import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import GithubInfo from "@/components/GithubInfo";

// Page-level metadata largely handled in `app/layout.tsx`.
// Keep page metadata minimal and specific if needed.
export const revalidate = 86400; // revalidate once per day

export default function Home() {
  return (
    <>
      <Landing />
      <Skills />
      <GithubInfo />
    </>
  );
}
