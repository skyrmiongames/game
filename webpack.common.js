const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [
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
