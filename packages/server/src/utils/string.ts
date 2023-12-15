import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants/index.js";

export function convertSnakeToCamel(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeToCamel(item));
  }

  const camelObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_(\w)/g, (_, c) =>
        c ? c.toUpperCase() : ""
      );
      const value = obj[key];

      if (value instanceof Date) {
        camelObj[camelKey] = dayjs(value).format(DATE_FORMAT);
      } else if (typeof value === "object") {
        camelObj[camelKey] = convertSnakeToCamel(value);
      } else {
        camelObj[camelKey] = value;
      }
    }
  }

  return camelObj;
}
