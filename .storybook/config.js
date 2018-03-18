import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import "./app.scss";


const req = require.context('../stories', true, /\.stories\.js$/);

setOptions({
    name: 'Kenshoo Shared',
    url: 'https://github.com/kenshoo/react-shared',
    goFullScreen: false,
    showLeftPanel: true,
    showDownPanel: true,
    showSearchBox: false,
    downPanelInRight: true,
    sortStoriesByKind: false,
});

function loadStories() {
	req.keys().forEach(req)
}

configure(loadStories, module);
