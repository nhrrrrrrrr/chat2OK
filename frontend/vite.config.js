/* eslint-disable no-mixed-spaces-and-tabs */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
	resolve: {
		alias: {
			'@mui/styled-engine': '@mui/styled-engine-sc',
		},
	},

});
