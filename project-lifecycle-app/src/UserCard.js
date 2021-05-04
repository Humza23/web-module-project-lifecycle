import React from 'react'

const UserCard = (props) => {
    return (
        <div>
            {props.data.map(user => {
                return (<h1> {user} </h1>)
            })}
        </div>
    )
}

export default UserCard
