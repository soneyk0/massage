import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {pureAddUserCallback, UserType} from './HW3'
import user from "../hw08/User";
import error404 from "../hw05/pages/Error404";
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

type GreetingContainerPropsType = {
    users: Array<UserType> // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: (error:string)=>void, setName: (name:string)=>void, addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпу
    if(name===''){
        setError('Error')
    } else{
    addUserCallback(name)}
    setName('')
}

export const pureOnBlur = (name: string, setError: (error:string)=>void) => { // если имя пустое - показать ошибку
    if(name===''){
        setError('Error')
    }
}

export const pureOnEnter = (e: KeyboardEvent, addUser: ()=>void) => { // если нажата кнопка Enter - добавить
    if(e.key === 'Enter'){
        addUser()
    }
}



// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (name: string) => { // need to fix any
        setName(name) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent) => {
        pureOnEnter(e, addUser)
    }
    const totalUsers = users.length // need to fix
    const lastUserName = users.length ? users[totalUsers - 1].name:'' // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
