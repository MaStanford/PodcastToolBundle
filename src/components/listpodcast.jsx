import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'rss-parser';

//https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
import styles from '../styles/styles';

import Item from './itempodcast';

let parser = new Parser();

export default class PodcastList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rssFeedUri: props.rssFeedUri,
            feed: null
        };
        this.fetchRSS(this.state.rssFeedUri);
    }

    componentWillReceiveProps(nextProps){
        this.setState({rssFeedUri: nextProps});
    }

    getItems(feed) {
        return feed.items.map((item) => {
            return (
                <Item onItemClicked={() => this.props.onItemClicked(item)} key={item.guid} title={item.title} date={item.pubDate} summary={item.content} />
            );
        });
    }

    fetchRSS(url) {
        //https://www.npmjs.com/package/rss-parser
        parser.parseURL(url, (err, feed) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({ feed: feed });
            }
        });
    }

    render() {
        const feed = this.state.feed ? this.getItems(this.state.feed) : null;
        return (
            <div style={styles.PodcastList}>
                <ul>
                {feed}
                </ul>
            </div>
        );
    }
}

PodcastList.propTypes = {
    rssFeedUri: PropTypes.string,
    onItemClicked: PropTypes.func.isRequired
};
PodcastList.defaultProps = { 
    rssFeedUri: '',
    onItemClicked: () => { }
};