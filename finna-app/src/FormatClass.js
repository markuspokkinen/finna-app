import React, { Component } from 'react';

export default class FormatClass extends Component {

    componentDidMount() {
        fetch("https://api.finna.fi/v1/search" + this.props.data.href)
            .then(res => res.json())
            .then(response => {
                console.log(response);
            })
    }

    render() {
        console.log(this.props.data);
        return (
            <p>{this.props.data.value}</p>
            )
    }
}