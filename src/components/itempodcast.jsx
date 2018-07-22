import React from 'react';
import PropTypes from 'prop-types';

export default class ItemPodcast extends React.Component {

    render() {
        return (
            <div className='ItemPodcastList'>
                <div>
                    {this.props.title}
                </div>
                <div>
                    {this.props.date}
                </div>
                <div>
                    {this.props.summary}
                </div>
            </div>
        );
    }
}

ItemPodcast.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
};
ItemPodcast.defaultProps = {
    title: 'Title',
    date: (new Date().toLocaleDateString()),
    summary: 'summary'
}