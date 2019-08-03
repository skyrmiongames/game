const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif|csv)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "[name]-[hash].[ext]" },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{ from: "res/**" }]),
        new HtmlWebpackPlugin({
            inject: false,
            template: require("html-webpack-template"),

            title: "Game",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: [
            "*", // So files included with extensions work
            ".ts", // So typescript modules work
            ".js",
        ],
    },
};
