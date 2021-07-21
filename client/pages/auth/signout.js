import Router from 'next/router'
import React, { useEffect } from 'react'
import useRequest from '../../hooks/use-request'

function Signout() {
    const { doRequest } = useRequest({
        url: 'http://localhost:3000/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        doRequest();
    }, [])

    return (
        <div className="container">
            Signing you out...
        </div>
    )
}

export default Signout
