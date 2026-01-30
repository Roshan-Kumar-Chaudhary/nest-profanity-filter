# nest-profanity-filter

NestJS profanity filter with English + Nepali support and custom dictionaries.

## Install
npm i nest-profanity-filter

## Usage (NestJS)
```ts
import { Module } from "@nestjs/common";
import { ProfanityModule } from "nest-profanity-filter";

@Module({
  imports: [
    ProfanityModule.forRoot({
      locales: ["en", "ne"],
      customWords: {
        en: ["fooBadWord"],
        ne: ["नेपालीशब्द"]
      },
      maskChar: "*",
      preserveFirstLast: true
    }),
  ],
})
export class AppModule {}
