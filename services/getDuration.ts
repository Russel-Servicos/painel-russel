import convertUnicode from "./convertUnicode";

const getDuration = (duration: string) => {
  const splitedDuration = convertUnicode(duration).split(";");
  const days = splitedDuration.slice(0, -1);
  const hours = splitedDuration.at(-1);

  return `${days.join(", ")} (${hours})`;
};

export default getDuration;
