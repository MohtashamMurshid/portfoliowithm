let lastCommittedPathname: string | null = null;

export function getLastCommittedPathname() {
  return lastCommittedPathname;
}

export function commitPathname(pathname: string) {
  lastCommittedPathname = pathname;
}
