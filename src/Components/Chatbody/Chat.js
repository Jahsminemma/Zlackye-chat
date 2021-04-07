import React, { useState, useEffect } from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import db, { storage } from "../../firebase"
import MessageInput from "./MessageInput";
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import avatar from '../../assets/images/avatar.png'
import firebase from 'firebase'
import { useStateValue } from "../../StateProvider";
import ImageModal from './ImageModal'
import { errorHandler, imageFileUpload, snapshot, pdfFileUpload, audioFileUpload } from './uploadFile'



const Chat = () => {

    const { roomId } = useParams()
    const [roomInfos, setRoomInfos] = useState([])
    const [channelMessages, setChannelMessages] = useState([])
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [image, setImage] = useState("")
    const [pdf, setPdf] = useState("")
    const [readerResult, setReaderResult] = useState("")
    const [audio, setAudio] = useState("")
    const [progress, setProgress] = useState("")
    const [state] = useStateValue()
    const sendMessage = (e) => {
        setOpen(false)
        setInputValue("")
        setImage(false)
        setPdf(false)
        setAudio(false)
        e.preventDefault()
        e.target.value = ""
        const messageObj = {
            message: inputValue,
            user: state.auth.user.displayName,
            userImage: state.auth.user.photoURL,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: state.auth.user.uid
        }

        if (roomId && !image && !pdf && !audio && inputValue) {
            db.collection('rooms').doc(roomId).collection("messages").add({
                ...messageObj
            })
        }

        const storageRef = storage.ref();
        if (image) {
            const uploadImage = storageRef.child(`images/${image.name}`).put(image);
            uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                imageFileUpload({ image, db, roomId, messageObj, uploadImage })
            );
        }
        if (pdf) {
            const uploadPdf = storageRef.child(`pdf/${pdf.name}`).put(pdf);
            uploadPdf.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                pdfFileUpload({ pdf, db, roomId, messageObj, uploadPdf })
            );
        }
        if (audio) {
            const uploadAudio = storageRef.child(`audio/${audio.name}`).put(audio);
            uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                },
                errorHandler,
                audioFileUpload({ audio, db, roomId, messageObj, uploadAudio })
            );
        }


    }
    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomInfos(snapshot.data())
            })

            db.collection('rooms').doc(roomId).collection("messages")
                .orderBy("timeStamp").onSnapshot(snapshot => {
                    setChannelMessages(snapshot.docs.map(doc => doc.data()))
                })
        }
    }, [roomId])


    return (
        <div className="chat">
            <ChatHeader roomInfos={roomInfos} value={`${channelMessages?.length} messages`} image={avatar} />
            <ChatMessage hash={"#"} Messages={channelMessages} progress={progress} />
            <ImageModal pdf={pdf} setPdf={setPdf}
                Image={image} setImage={setImage} setOpen={setOpen}
                open={open} readerResult={readerResult} audio={audio} setAudio={setAudio} />
            <div className="message__input">
                < MessageInput
                    setImage={setImage}
                    sendMessage={sendMessage}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    setReaderResult={setReaderResult}
                    setOpen={setOpen}
                    setPdf={setPdf}
                    setAudio={setAudio}
                />
            </div>
        </div>
    )
}

export default Chat
