const http = require("http");
const { randomUUID } = require("crypto")

const users = [];

const server = http.createServer((req, res) => {
    if (req.url === "/users") {
        if (req.method === 'GET') {
            return res.end(JSON.stringify(users));
        }
    };

    if (req.method === 'POST') {
        req
            .on("data", (data) => {
            const dataUser = JSON.parse(data);

            const user = {
                id: randomUUID(),
                ...dataUser
            };

            users.push(user);
            
        }).on("end", () => {
            return res.end(JSON.stringify(users));
        });
    };

    if (req.url.startsWith("/users")) {
        if (req.method === "PUT") {
            const url = req.url;
            const splitURL = url.split("/");

            const idUser = splitURL[2];

            const userIndex = users.findIndex(user => user.id === idUser);

            req
                .on("data", (data) => {
                const dataUser = JSON.parse(data);

                users[userIndex] = {
                    id: idUser,
                    ...dataUser
                };
            }).on("end", () => {
                return res.end(JSON.stringify(users));
            });
        };
    };

});

server.listen(4000, () => console.log("Server is running on PORT 4000"));