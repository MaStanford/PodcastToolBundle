import React from 'react';
import PropTypes from 'prop-types';

//https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
import styles from '../styles/styles';

export default class ItemPodcast extends React.Component {

    render() {
        return (
            <li>
                <div style={styles.PodcastListItem} onClick={() => {this.props.onItemClicked()}}>
                    <divider />
                    <div>
                        {this.props.title}
                    </div>
                    <divider />
                    <div>
                        {this.props.date}
                    </div>
                    <divider />
                    <div>
                        {this.props.summary}
                    </div>
                    <divider />
                </div>
            </li>
        );
    }
}

ItemPodcast.propTypes = {
    onItemClicked: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
};
ItemPodcast.defaultProps = {
    onItemClicked: () => {},
    title: 'Title',
    date: (new Date().toLocaleDateString()),
    summary: 'summary'
}