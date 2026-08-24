export const estimateReadingTime=text=>Math.max(1,Math.ceil(String(text).trim().split(/\s+/).length/200));
