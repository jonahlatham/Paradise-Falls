import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'

let baseUrl = '/api/paradisefalls'

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

class Home extends Component {
    state = {
        items: [],
        people: [],
    }

    componentDidMount() {
        axios.get(baseUrl)
            .then((response) => {
                this.setState({
                    items: response.data
                })
                return axios.get(`${baseUrl}/people`)
            })
            .then((response) => {
                this.setState({
                    people: response.data
                })
            })

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
        }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        let amountNeeded = this.state.items.reduce((r, e) => {
            return r += (e.price - e.amount_saved)
        }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

        let friends = this.state.people.map((e, i) => {
            return <div key={e.id}>{e.first_name}</div>
        })
        return (
            <div className='homeApp'>
                <div className='topHalfHome'>
                    <div className='friends'>
                        {friends}
                    </div>
                    <div>
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
                    </div>
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