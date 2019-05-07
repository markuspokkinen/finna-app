import React, { Component } from 'react';
import FormatClass from './FormatClass';
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facets: [],
            lang: "fi",
            status: "non",
            selected: 0
        }
    }

    componentDidMount() {
        this.getfacets();
    }

    getfacets() {
        fetch("https://api.finna.fi/v1/search?lookfor=&facet[]=format&limit=0&lng=" + this.state.lang)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    facets: response.facets.format,
                    status: response.status
                });
            })
    }
    selectOnChange = (event) => {
        this.setState({
            lang: event.target.value,
            status: "non",
            selected :0
        }, () => {
            this.getfacets();
        })
    }
    buttonClick = (event) => {
        this.setState({
            selected: parseInt(event.target.attributes.index.value)
        })
    }

    render() {
        let langSelect =
            <select name="lang" onChange={this.selectOnChange}>
                <option defaultValue>fi</option>
                <option>en-gb</option>
                <option>sv</option>
            </select>;

        if (this.state.status === "OK") {
            return (
                <div>
                    {langSelect}
                    <div>
                        {this.state.facets.map((element,index) => {
                            return <button key={element.value} index={index} onClick={this.buttonClick}>{element.translated}</button>
                        })}
                    </div>

                    <FormatClass data={this.state.facets[this.state.selected]} />
                </div>
            );
        }
        if (this.state.status === "non") {
            return (
                <div>
                    {langSelect}
                    <div>
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }
    }
}