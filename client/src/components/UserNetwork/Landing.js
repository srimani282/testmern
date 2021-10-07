import React from 'react'
import { connect } from 'react-redux'

export const Landing = (props) => {
    return (
        <div className="container" >
            <p>Home</p>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
