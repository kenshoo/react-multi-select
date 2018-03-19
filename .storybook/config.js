import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import "./app.scss";


const req = require.context('../stories', true, /\.stories\.js$/);

setOptions({
    name: 'React Multi Select',
    url: 'https://github.com/kenshoo/react-multi-select',
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
