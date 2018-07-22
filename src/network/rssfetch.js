import { net } from 'electron';

const RSSFetch = {
    fetchRSSFeed: (url) => {
        console.log(url);
        return new Promise((resolve) => {
            console.log('In promise');
            const request = net.request({
                method: 'GET',
                protocol: 'https:',
                hostname: 'github.com',
                port: 443,
                path: '/'
            });
            request.on('response', resolve);
        });
    },
}

export default RSSFetch;