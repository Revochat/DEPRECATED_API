import { ErrorIntercept } from "./intercept.errors"

export const ErrorRouter = {
        path: "*",
        E404: {
            method: "GET",
            path: "",
            res: ErrorIntercept.ERR404
        }
}