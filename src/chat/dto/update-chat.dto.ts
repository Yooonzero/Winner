import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateChatDto extends PartialType(CreateRoomDto) {}
