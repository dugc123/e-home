module.exports = {
    secret: "yao",
    expiresIn() {
        return Math.round(Date.now() / 1000) + 3600 * 24 * 7
    }
}