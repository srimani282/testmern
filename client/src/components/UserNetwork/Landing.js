import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export const Landing = (props) => {

    useEffect(() => {

        try {
            const res = await api.get('/', {
                name: formData.name,
                email: formData.email, password: formData.password
            });
            setSuccess("success")

        } catch (err) {
            setSuccess(err.response.data)
        }

    }, [input])
    return (
        <div className="container" >
            <p>Home</p>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

    isAuthenticated: state.auth.isAuthenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
