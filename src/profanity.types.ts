export type Locale = "en" | "ne";

export interface ProfanityOptions {
  locales?: Locale[]; 
  customWords?: Partial<Record<Locale, string[]>>; 
  maskChar?: string; 
  preserveFirstLast?: boolean;
  caseInsensitive?: boolean;
}
