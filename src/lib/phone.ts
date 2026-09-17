export const DUTCH_PHONE_PATTERN = /^\+31\s?([0-9]\s?){9}$/;

/** Formats free-form input into +31 6 1234 5678 / +31 20 123 4567 while typing. */
export const formatDutchPhone = (raw: string): string => {
  let input = raw;
  if (!input) return "";
  if (input === "+" || input === "+3" || input === "+31" || input === "+31 ") return "";

  if (!input.startsWith("+31")) {
    let digits = input.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("0031")) digits = digits.slice(4);
    else if (digits.startsWith("31")) digits = digits.slice(2);
    input = "+31 " + digits;
  }

  let local = input.slice(3).replace(/\D/g, "");
  // "06 12345678" typed nationally → drop the trunk 0 so it becomes +31 6 ...
  if (local.startsWith("0")) local = local.slice(1);
  if (local.length > 9) local = local.slice(0, 9);

  let formatted = "+31";
  if (local.length === 0) return formatted + " ";

  if (local[0] === "6") {
    formatted += " 6";
    if (local.length > 1) formatted += " " + local.slice(1, 5);
    if (local.length > 5) formatted += " " + local.slice(5, 9);
  } else if (local.length <= 2) {
    formatted += " " + local;
  } else if (local.length <= 5) {
    formatted += " " + local.slice(0, 2) + " " + local.slice(2);
  } else {
    formatted += " " + local.slice(0, 2) + " " + local.slice(2, 5) + " " + local.slice(5, 9);
  }
  return formatted;
};
