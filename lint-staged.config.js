export default {
    "*.ts": [
        () => "tsc",
        "prettier --write",
        "eslint"
    ],
};