import React, { Component } from 'react';
import DamsMap from '../Map/damsMap';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }
    render() { 
        return ( 
            <div>
                <DamsMap />
            </div>
        );
    }
}
 
export default Landing;