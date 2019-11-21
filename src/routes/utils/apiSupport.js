//apiSupport.js

export function executeApiRequest(req, res, route, getData) {
    if (req.query.userId === undefined) {
        res.status(400).json({ error: "No user id provided" });
    } else {
        try {
            getData(req.query.userId).then(result => {
                res.status(200).json(result);
            });
        } catch (err) {
            console.log(route, err);
            res.status(500).json({
                error: `${route} failure`
            });
        }
    }
}
