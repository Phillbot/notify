import { Module } from "@nestjs/common";

import { ChatModule } from "./modules/chat/chat.module";
import { PrismaModule } from "./common/prisma/prisma.module";

@Module({
  imports: [PrismaModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
