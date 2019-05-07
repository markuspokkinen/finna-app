import React, { Component } from 'react';
import FormatClass from './FormatClass';

export default class FormatCombiner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected:0
        })
    }

    buttonClick = (event) => {
        this.setState({
            selected: parseInt(event.target.attributes.index.value)
        })
    }
    render() {
        if (this.props.data.children) {
            return (
                <div>
                    <div>
                        {
                            this.props.data.children.map((element,index) => {
                                return <button key={element.value} index={index} onClick={this.buttonClick}>{element.translated}</button>
                            })
                        }
                    </div>
                    <div>
                        <FormatClass data={this.props.data.children[this.state.selected]} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <FormatClass data={this.props.data} />
                </div>
            )
        }

    }
}