import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {ADMIN} from "../constants";


export const IsAdmin = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (request.user.role == ADMIN){
            return true;
        }
        return false;
    }
)