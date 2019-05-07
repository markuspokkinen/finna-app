import React, { Component } from 'react';

export default class FormatClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            status: "non"
        }
    }

    componentDidMount() {
        this.getdata()
    }
    componentWillReceiveProps = () => {
        this.setState({
            status: "non"
        }, () => {
            this.getdata();
        })

    }

    getdata = () => {
        fetch("https://api.finna.fi/v1/search" + this.props.data.href)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    records: response.records,
                    status: "Ok"
                })
            })
    }
    render() {
        if (this.state.status === "Ok") {
            return (
                <div>
                    {
                        this.state.records.map(element => {
                            console.log(element);
                            if (element.images.length > 0) {
                                return <div key={element.id}>
                                    <img src={"https://api.finna.fi" + element.images[0]} />
                                    <p>{element.title}</p>
                                </div>
                            }else {
                                return <div key={element.id}>
                                    <p>No Image</p>
                                    <p>{element.title}</p>
                                </div>
                            }
                        })
                    }

                </div>
            );
        } else return (<p>Loading...</p>);

    }
}