import {registerAs} from "@nestjs/config";
import * as process from "node:process"

export default registerAs("backend", () => ({
    PORT: process.env.PORT
}))
