import { DynamicModule, Module } from "@nestjs/common";
import { PROFANITY_OPTIONS } from "./profanity.constants";
import { ProfanityOptions } from "./profanity.types";
import { ProfanityService } from "./profanity.service";

@Module({})
export class ProfanityModule {
  static forRoot(options: ProfanityOptions = {}): DynamicModule {
    return {
      module: ProfanityModule,
      providers: [
        { provide: PROFANITY_OPTIONS, useValue: options },
        ProfanityService,
      ],
      exports: [ProfanityService],
    };
  }
}
