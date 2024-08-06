export const getInitialLetters = (fullName: string) =>
  fullName
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
