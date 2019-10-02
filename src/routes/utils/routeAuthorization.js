//routeAuthorization.js

export function sayHello(req, res, next) {
    console.log(req.body, req.ip, req.method);
    if (!req.body.jwt && req.method !== "GET") {
        //res.status(400).json({ error: "Unauthorized access request" });
        //return { status: 400, error: "Unauthorized access" };
        res.status(401)
            .json({ error: "Unauthorized access request" })
            .end();
    }
    next();
}
