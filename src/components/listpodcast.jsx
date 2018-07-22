import React from 'react';
import PropTypes from 'prop-types';

//https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
import styles from '../styles/styles';

import Item from './itempodcast';

export default class PodcastList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
        };
    }

    render() {
        return (
            <div style={styles.PodcastList}>
                <Item onItemClicked={this.props.onItemClicked()} />
            </div>
        );
    }
}

PodcastList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClicked: PropTypes.func.isRequired
};
PodcastList.defaultProps  = {
    list: [],
    onItemClicked: () => {}
};