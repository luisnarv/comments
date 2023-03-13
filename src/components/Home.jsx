import React from 'react'
import QuoterContainer from './QuoterContainer'
import Slides from './Slides'
import PopularUI from './PopularUI'
import ReviewsUI from './ReviewsUI'

export default function Home() {
    return (
        <div>
            <Slides />
            <QuoterContainer />
            <PopularUI />
            <ReviewsUI />
            <div style={{ height: 40 }} />
        </div>
    )
}