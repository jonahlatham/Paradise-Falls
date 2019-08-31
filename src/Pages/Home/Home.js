import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'

let baseUrl = '/api/paradisefalls'
let peopleUrl = '/api/paradisefalls/people'

class Home extends Component {
    state = {
        items: [],
        people: [],
    }

    componentDidMount() {
        const firstRequest = axios.get(baseUrl)
            .then(response => this.setState({ items: response.data }))
        const secondRequest = axios.get(peopleUrl)
            .then(response => this.setState({ people: response.data }))

        // Promise.all([firstRequest, secondRequest])
        //         .then(()=>{
        //             return 
        //         })
        // axios.get(baseUrl)
        //     .then((response) => {
        //         this.setState({
        //             items: response.data,

        //         })
        //     })
    }

    render() {
        let amountSaved = this.state.items.reduce((r, e, i) => {
            return r += e.amount_saved
        }, 0)
        let amountNeeded = this.state.items.reduce((r, e) => {
            return r += (e.price - e.amount_saved)
        }, 0)

        let friends = this.state.people.map((e, i) => {
            console.log(e.name)
        })
        return (
            <div className='homeApp'>
                <div className='friends'>
                    {friends}
                </div>
                <div className='moneyPit'>
                    <u>You've Saved</u>
                    <br />
                    <div className='monies'>${amountSaved}</div>
                </div>
                <div className='moneyPit'>
                    <u>You Need</u>
                    <br />
                    <div className='monies'>${amountNeeded}</div>
                </div>
                <section className='newCrapList'>
                    <div className='insideCrapList'>
                        <button>Back</button>
                        <div>
                            <div className="image-slide"></div>
                        </div>
                        <button>Next</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home