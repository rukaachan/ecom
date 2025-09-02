import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rupiahFormat(value: bigint) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

export function dateFormat(date: Date | null, format = "DD-MMMM-YYYY") {
  if (!date) {
    return dayjs().format(format);
  }

  return dayjs(date).format(format);
}
