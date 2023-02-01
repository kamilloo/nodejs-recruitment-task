module.exports = (port) => {
    return {
        failOnErrors: true,
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Movies API",
                version: "1.0.0",
                description:
                    "This is a Demo Movies API",
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                },
            ],
        },
        apis: ["./routes/movies.js"],
    }
};