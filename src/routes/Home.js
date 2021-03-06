import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        })
    }, []);
    /*
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
        const nweetObject = {
            ...document.data(),
            id: document.id,
        };
        setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    */
    
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
          text: nweet,
          createdAt: Date.now(),
          creatorUID: userObj.uid,
        });
        setNweet("");
    };
    
    const onChange = (event) => {
        const {target:{value}} = event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input valut={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweetObj) => (
                    <Nweet key={nweetObj.id} nweetObj={nweetObj} isOweer={nweetObj.creatorUID === userObj.uid}/>
                ))}
            </div>
        </div>

    );
};
export default Home;