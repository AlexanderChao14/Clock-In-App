import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}',
		contentPath(import.meta.url, 'svelte')
	],

	theme: {
		extend: {}
	},

	plugins: [typography, forms, containerQueries,
		skeleton({
            // NOTE: each theme included will increase the size of your CSS bundle
            themes: [ themes.cerberus, themes.rose , themes.modern, themes.wintry]
        })
	]
};
