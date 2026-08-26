import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsNotEmpty } from "class-validator";
export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus
}