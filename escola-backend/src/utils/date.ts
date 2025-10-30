export const toBrasiliaTime = (date: Date): string => {
  return date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
};

export const convertDatesToBrasilia = <T extends Record<string, any>>(data: T | T[]): T | T[] => {
  const convertObject = (obj: Record<string, any>) => {
    const out: Record<string, any> = { ...obj };
    for (const key of Object.keys(out)) {
      const val = out[key];
      if (val instanceof Date) {
        out[key] = toBrasiliaTime(val);
      } else if (Array.isArray(val)) {
        out[key] = val.map((el) => (el && typeof el === "object" ? convertObject(el) : el));
      } else if (val && typeof val === "object") {
        out[key] = convertObject(val);
      }
    }
    return out as T;
  };

  if (Array.isArray(data)) return data.map((d) => convertObject(d as Record<string, any>)) as T[];
  return convertObject(data as Record<string, any>) as T;
};