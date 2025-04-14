import { signJWT } from "./signJWT";
import { signRefreshJWT } from "./signRefreshJWT";
import { setAuthCookies } from "@api/controllers/auth/helpers/setAuthCookies";

export default { signJWT, signRefreshJWT, setAuthCookies };
