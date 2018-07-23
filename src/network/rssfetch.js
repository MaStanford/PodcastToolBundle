//https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch';

const RSSFetch = {
    fetchRSSFeed: (url) => {
        return fetch(url);
    },
}

export default RSSFetch;