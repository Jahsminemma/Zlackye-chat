import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { useParams } from 'react-router-dom'
import MessageInput from './MessageInput'
import './UserChatScreen.css'
import db, { storage } from '../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider'
import { userAction } from '../../user.reducer'
import UserChatMessage from './UserChatMessage'
import TimeAgo from "timeago-react"
import ImageModal from "./ImageModal"
import { errorHandler, snapshot } from './uploadFile'




const UserChatScreen = () => {
    const { userId } = useParams()
    const [userInfos, setUserInfos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [state, dispatch] = useStateValue()
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState("")
    const [pdf, setPdf] = useState("")
    const [audio, setAudio] = useState("")
    const [readerResult, setReaderResult] = useState("")
    const [progress, setProgress] = useState("")

    const updateMessage = (messageObj) => {
        db.collection("conversations").add({
            ...messageObj,
            isView: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(error => {
            console.log(error)
        })
    }

    const getRealTimeConversation = (userId, authUserId) => {
        db.collection("conversations")
            .where("authUserId", "in", [userId, authUserId])
            .orderBy("createdAt", "asc")
            .onSnapshot(snapshot => {
                const conversation = []
                snapshot.forEach(doc => {
                    if ((doc.data().authUserId === authUserId && doc.data().userId === userId)
                        || (doc.data().authUserId === userId && doc.data().userId === authUserId)) {
                        conversation.push(doc.data())
                    }
                })
                dispatch({
                    type: userAction.REALTIME_CONVERSATION,
                    conversations: conversation
                })
            })
    }
    const sendMessage = (e) => {
        e.preventDefault()
        setOpen(false)
        setImage(false)
        setPdf(false)
        setAudio(false)
        setInputValue("")
        const messageObj = {
            authUserId: state.auth.user.uid,
            userId: userId,
            message: inputValue,
        }
        if (!image && !pdf && !audio && inputValue) {
            db.collection("users").doc(state.auth.user.uid)
                .update({
                    isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            updateMessage(messageObj)
            setInputValue("")
        }
        const storageRef = storage.ref();
        if (image) {
            const uploadImage = storageRef.child(`images/${image.name}`).put(image);
            uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                () => {
                    uploadImage
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && image) {
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        imageUrl: URL
                                    })
                            }
                        })
                }
            );
        }
        if (pdf) {
            const uploadPdf = storageRef.child(`pdf/${pdf.name}`).put(pdf);
            uploadPdf.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                () => {
                    uploadPdf
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && pdf) {
                                db.collection("users").doc(state.auth.user.uid)
                                    .update({
                                        isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        pdfUrl: URL,
                                        pdfName: pdf.name
                                    })
                            }
                        })
                }
            );
        }
        if (audio) {
            const uploadAudio = storageRef.child(`audio/${audio.name}`).put(audio);
            uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    const Isprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(Isprogress)
                    console.log(progress)
                },
                errorHandler,
                () => {
                    uploadAudio
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && audio) {
                                db.collection("users").doc(state.auth.user.uid)
                                    .update({
                                        isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        audioUrl: URL,
                                        audioName: audio.name
                                    })
                            }
                        })
                }
            );
        }

    }


    useEffect(() => {
        if (userId) {
            db.collection("users")
                .doc(userId).onSnapshot(doc => {
                    setUserInfos(doc.data())
                })
        }
        getRealTimeConversation(userId, state.auth.user.uid)
    }, [userId])
    return (
        <div className="userChatScreen">
            <ChatHeader roomInfos={userInfos} image={userInfos?.photoURL}
                value={userInfos?.isOnline ? (
                    <small>Last seen : <TimeAgo datetime={userInfos?.isCreatedAt.toDate()} /></small>
                ) : ("offline")} />
            <UserChatMessage Messages={state.users.conversations} progress={progress} />
            <ImageModal Image={image} setAudio={setAudio} audio={audio} pdf={pdf} setPdf={setPdf} setImage={setImage} setOpen={setOpen} open={open} readerResult={readerResult} />
            <div className="message__input">
                < MessageInput
                    image={image}
                    setImage={setImage}
                    sendMessage={sendMessage}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    readerResult={readerResult}
                    setReaderResult={setReaderResult}
                    setOpen={setOpen}
                    setPdf={setPdf}
                    setAudio={setAudio}
                />
            </div>
        </div>
    )
}

export default UserChatScreen
