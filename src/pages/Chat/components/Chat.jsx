import React, { useState, useEffect } from 'react'
import { postRequest } from '../../../utils'


const ChatBubble = ({ data }) => {
    const { sender, message } = data

    if (!message) return

    if (sender === 'bot') return (
        <div className="flex mb-4 cursor-pointer items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt={sender} className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex max-w-96 bg-gray-200 rounded-lg p-3 gap-3">
                <p className="text-gray-700">{message}</p>
            </div>
        </div>
    )

    return (
        <div className="flex justify-end mb-4 cursor-pointer items-center">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>{message}</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </div>
    )
}

const Chat = () => {
    const [generating, setGenerating] = useState(false)
    const [convo, setConvo] = useState([{
        sender: 'bot',
        message: 'How can I help you?'
    }])
    const [input, setInput] = useState('')
    const [message, setMessages] = useState([])

    useEffect(() => {
        const fetchStream = async () => {
            const response = await fetch('http://127.0.0.1:8000/dev/eval/stream')
            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let done = false
            let streamText = ''

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading

                streamText += decoder.decode(value, { stream: true })
                setMessages(streamText)

            }
        }
        // fetchStream()
    }, [])

    const handleInput = (e) => {
        const { target: { value } } = e
        setInput(value)
    }

    const handleKeyDown = (e) => {
        const { key } = e;
        if (key === 'Enter') handleSubmit(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConvo(prev => [...prev, { sender: 'user', message: input }])
        setGenerating(true)
        if (!input) return
        setInput('')
        let streamText = ''
        try {
            const postURL = `http://127.0.0.1:8000/dev/eval/generate_llm?input=${input}`
            const response = await postRequest(postURL, {}, () => { })
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let done = response.body?.getReader() && false
            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                streamText += decoder.decode(value, { stream: true })
                setMessages(streamText)
                setGenerating(!done)
            }
        } catch (error) {
            setGenerating(false)
            setConvo(prev => [...prev, { sender: 'bot', message: "Bot is not responsive." }])
        } finally {
            setConvo(prev => [...prev, { sender: 'bot', message: streamText }])
        }
    }

    return (
        <div className="flex-1 mt-10 h-auto">
            <header className="bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>
            <div className="h-96 overflow-y-auto p-4 pb-36 ">
                {convo &&
                    convo.map((item, idx) => <ChatBubble key={idx} data={item} />)
                }
                {
                    generating && <ChatBubble data={{ sender: 'bot', message }} />
                }
            </div>

            <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-screen">
                <div className="flex items-center">
                    <input type="text" onChange={handleInput} onKeyDown={handleKeyDown} autoFocus={true} value={input} placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat