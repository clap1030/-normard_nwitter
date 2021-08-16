import { dbService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({nweetObj , isOweer}) => {
    //수정화면여부
    const [editing, setEditing] = useState(false);
    //수정한text, 기본값은 원래 text
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //삭제
    const onDeleteClick  = async () => {
        const res = window.confirm("삭제하시겠습니까?");
        if(res){
            //delete
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };

    //editing여부 이전과 반대로
    const toggleEditing = () => setEditing((prev) => !prev);

    //변경한 nweet저장
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    };

    //변경한 내용 DB저장
    const onSubmit = (event) => {
        event.preventDefault();
        //DB에 저장
        dbService.doc(`nweets/${nweetObj.id}`).update({
           text:newNweet 
        });
        setEditing(false);
    };
    return (
        <>
            {editing && isOweer ?
            (
            <>
                <form onSubmit={onSubmit}>
                    <input  
                        type="text" 
                        value={newNweet} 
                        onChange={onChange}
                        required
                        placeholder="Edit your nweet"        
                    />
                    <input type="submit" value="Update!"/>
                </form>
                <button onClick={toggleEditing}>cancel</button>
            </>
            )
            :(
            <>
                <h4>{nweetObj.text}</h4>
                {isOweer && (
                    <>
                        <button onClick={onDeleteClick }>Delete</button>
                        <button onClick={toggleEditing }>Edit</button>
                    </>
                )}
                
            </>
            )}
        </>
        
    );
};

export default Nweet;