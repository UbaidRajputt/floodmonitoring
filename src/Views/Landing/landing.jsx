import React, { Component } from 'react';
import DamsMap from '../Map/damsMap';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }
    render() { 
        return ( 
            <div>
                <Header />
                <DamsMap />
                <Footer />
            </div>
        );
    }
}
 
export default Landing;