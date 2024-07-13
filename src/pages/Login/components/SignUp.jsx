import { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

export const SignUp = () => {
    const [logged] = useState(false)
    const [userInput, setUserInput] = useState({})
    const navigate = useNavigate()

    if (logged) return (<Navigate to="/" replace />)

    const handleInput = (e) => {
        const { id, value } = e.target

        setUserInput({ ...userInput, [id]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, cPassword } = userInput;
        if (password === cPassword) {
            const headers = {
                "Content-Type": "application/json",
            }
            const url = 'http://localhost:8080/api/v1/auth/signup'
            try {
                const request = new Request(url, {
                    headers,
                    method: 'POST', body: JSON.stringify({username, password})
                })
                const response = await fetch(request)
                console.log(response)
                if (response.status === 201) {
                    localStorage.setItem('userInfo', JSON.stringify({ ...userInput, logged: true }))
                    navigate('/')
                }

            } catch (error) {
                console.error(error)
            }
        }

        // navigate("/")
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="username" value={userInput.username} onChange={handleInput} name="username" type="text" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" value={userInput.password} onChange={handleInput} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
                        </div>
                        <div className="mt-2">
                            <input id="cPassword" value={userInput.cPassword} onChange={handleInput} name="cPassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?
                    <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
                </p>
            </div>
        </div>
    )
}
