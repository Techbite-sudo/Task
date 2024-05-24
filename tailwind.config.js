/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/spinner.js",
		"./node_modules/@nextui-org/theme/dist/components/image.js",
	],
	theme: {
		extend: {
			colors: {
				dark: "#58514d",
				paper: "#f5f5f5",
				borders: "#f6f6e9",
			},
			screens: {
				sm: "360px",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#f27427",
							50: "#fef1e9",
							100: "#fbd5be",
							200: "#f9ba93",
							300: "#f69e68",
							400: "#f3823d",
							500: "#f27427",
							600: "#c25d1f",
							700: "#914617",
							800: "#612e10",
							900: "#301708",
						},
					},
				},
			},
		}),
	],
};

