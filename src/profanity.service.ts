import { Inject, Injectable, Optional } from "@nestjs/common";
import { EN_WORDS } from "./dictionaries/en";
import { NE_WORDS } from "./dictionaries/ne";
import { PROFANITY_OPTIONS } from "./profanity.constants";
import { Locale, ProfanityOptions } from "./profanity.types";
import { buildWholeWordRegex, maskWord } from "./profanity.utils";

type InternalOptions = Required<Omit<ProfanityOptions, "customWords" | "locales">> & {
  locales: Locale[];
  customWords: Partial<Record<Locale, string[]>>;
};

@Injectable()
export class ProfanityService {
  private options: InternalOptions;
  private regexByLocale = new Map<Locale, RegExp>();

  constructor(@Optional() @Inject(PROFANITY_OPTIONS) opts?: ProfanityOptions) {
    this.options = {
      locales: ["en", "ne"],
      customWords: {},
      maskChar: "*",
      preserveFirstLast: true,
      caseInsensitive: true,
      ...(opts ?? {}),
    };
    this.rebuild();
  }

  /**
   * Allow programmatic updates (optional).
   */
  configure(opts: ProfanityOptions) {
    this.options = {
      ...this.options,
      ...opts,
      locales: opts.locales ?? this.options.locales,
      customWords: opts.customWords ?? this.options.customWords,
    };
    this.rebuild();
  }

  private rebuild() {
    const localeWords: Record<Locale, string[]> = {
      en: [...EN_WORDS, ...(this.options.customWords.en ?? [])],
      ne: [...NE_WORDS, ...(this.options.customWords.ne ?? [])],
    };

    this.regexByLocale.clear();

    for (const locale of this.options.locales) {
      const rx = buildWholeWordRegex(localeWords[locale], this.options.caseInsensitive);
      if (rx) this.regexByLocale.set(locale, rx);
    }
  }

  hasProfanity(text: string, locale?: Locale): boolean {
    if (!text) return false;
    const locales = locale ? [locale] : this.options.locales;

    return locales.some((loc) => {
      const rx = this.regexByLocale.get(loc);
      return rx ? rx.test(text) : false;
    });
  }

  clean(text: string, locale?: Locale): string {
    if (!text) return text;
    const locales = locale ? [locale] : this.options.locales;

    let output = text;
    for (const loc of locales) {
      const rx = this.regexByLocale.get(loc);
      if (!rx) continue;

      output = output.replace(rx, (match) =>
        maskWord(match, this.options.maskChar, this.options.preserveFirstLast),
      );
    }
    return output;
  }
}
