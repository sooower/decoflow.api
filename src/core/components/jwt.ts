import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { mergeObjects } from "@/core/utils";

import { globalConfig } from "./config";

type JwtConfig = {
    secret: Secret;
    options: SignOptions;
};

function sign(payload: string | object) {
    const { secret, options } = getJwtConfig();

    return jwt.sign(payload, secret, options);
}

function parse(token: string) {
    return jwt.decode(token);
}

function verify(token: string) {
    const { secret, options } = getJwtConfig();

    return jwt.verify(token, secret, options);
}

function getJwtConfig() {
    return mergeObjects<JwtConfig>(globalConfig.jwt, {
        secret: "Test_Jwt_Sign_Secret",
        options: {
            expiresIn: "30d",
        },
    });
}

export const Jwt = { sign, verify, parse };
