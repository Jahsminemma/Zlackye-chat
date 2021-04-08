import React, { useState } from 'react'
import Textarea from 'react-textarea-autosize'
import SendIcon from '@material-ui/icons/Send';
import './MessageInput.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { getUnreadMessage } from '../Sidebar/SidebarOption/SidebarOption';
import { useStateValue } from '../../StateProvider';


const MessageInput = ({ sendMessage, setPdf, setInputValue, inputValue,
    setImage, setReaderResult, setOpen, setAudio, userId }) => {

    const [state] = useStateValue()
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleUplaod = (e) => {
        const file = e.target.files[0]
        const filePath = e.target.value
        // Allowing file type
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        const pdfExt = /(\.pdf)$/i;
        const audioExt = /(\.wAV|\.ogg|\.mp3|\.AAC|\.WMC|\.FLAC)$/i;
        if (!file) {
            alert("No file added")
            e.target.value = "";
            return false
        } else {
            if (file) {
                const fileSize = file.size;
                const actualFsize = Math.round(fileSize / 1024);
                if (actualFsize) {
                    if (allowedExtensions.exec(filePath)) {
                        setOpen(true)
                        setImage(file)
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            setReaderResult(e.target.result)
                        }
                        reader.readAsDataURL(file)
                    } else if (pdfExt.exec(filePath)) {
                        setOpen(true)
                        setPdf(file)
                    } else if (audioExt.exec(filePath)) {
                        setOpen(true)
                        setAudio(file)
                    }
                    else {
                        alert(`unsupported file this are the only supported file
                         \n ${allowedExtensions} ${pdfExt} ${audioExt}`)
                    }
                } else { alert("file too big file must be less than 6mb") }
            }
        }
    }
    return (
        <div className="message_input">
            <form >
                <input type="file" id="file" name="file" className="file-input" onChange={handleUplaod} />
                <label htmlFor="file">
                    <AttachFileIcon />
                </label>
                <Textarea
                    value={inputValue}
                    onFocus={getUnreadMessage(userId, state.auth.user.uid)}
                    onInput={handleChange}
                    placeholder="Type a message..."
                    maxRows={4} />
                <button onClick={sendMessage} type="submit">
                    <SendIcon />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
