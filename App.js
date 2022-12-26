import './App.css';
import { useState, useRef } from 'react';

function App() {

  let randomImg = () => {
    let num = Math.floor(Math.random() * 10 / 3)
    if(num == 1){
      return 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'
    }else if(num == 2){
      return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'
    }else return 'https://citrusamerica.com/wp-content/uploads/2021/04/brian-profile-image-2-1000x1000-1.jpg'
  }

  const friendsArr = [{
    name: 'Alex', img: randomImg(), data: []},
    {name: 'Ban', img: randomImg(), data: []},
    {name: 'Mr. Ben', img: randomImg(), data: []
  }]
  let [friends,setFriends] = useState(friendsArr)
  let [curentChat, setCurentChat] = useState({
    friendName: friends[0].name,
     friendImg: friends[0].img,
      friendData: friends[0].data
    });

  let inputRef = useRef();
  let searchFriendRef = useRef();

  let handleClickMessage = () => {
    if(inputRef.current.value !== null && inputRef.current.value.replace(/\s/g, '').length > 0){
      friends.filter(friend => friend.name === curentChat.friendName)[0].data.push(inputRef.current.value)
      setCurentChat({...curentChat})
      inputRef.current.value = '';
    }else{alert(`Sorry, you can't send empty message !`)}
  }

  let handleSubmitMessage = (e) => {
    if (e.key === 'Enter') {
      if(inputRef.current.value !== null && inputRef.current.value.replace(/\s/g, '').length > 0){
          friends.filter(friend => friend.name === curentChat.friendName)[0].data.push(inputRef.current.value)
          setCurentChat({...curentChat})
          inputRef.current.value = '';
        }else{alert(`Sorry, you can't send empty message !`)}
    }
  }

  let handleAddFriend = (e) => {
    if (e.key === 'Enter') {
      if(searchFriendRef.current.value !== null && searchFriendRef.current.value.replace(/\s/g, '').length > 0){
        friends.push({name: searchFriendRef.current.value, img: randomImg(), data: []})
        setFriends([...friends])
        searchFriendRef.current.value = '';
      }else{alert(`Sorry, you can't send empty message !`)}
    }
  }

  let deleteFriend = (name) => {
    const updatedFriendList = friends.filter(friend => friend.name !== name)
    setFriends(updatedFriendList);
  };

  return (
    <div className="App">
      <div className='contacts'>
      <input className='searchBar' type="text" placeholder="Search" ref={searchFriendRef} onKeyDown={handleAddFriend} ></input>       
        <div className='contactList'>
          {friends.map((friend) => {
            console.log(friend.img) 
            return (                           
              <div className='individ' key={friends[friend]} onClick={()=>setCurentChat({
                friendName: friend.name,
                 friendImg: friend.img,
                  friendData: friend.data
                  })}>
                <div className='persImg'>
                  <img className='persImg' src={friend.img} alt=''></img>
                </div>
                <div className='cont'>               
                  <div className='individName'>
                    {friend.name}                  
                  </div>
                  <div className='deleteFriend' onClick={() => deleteFriend(friend.name)}>X</div>
                </div>                         
              </div>              
            )
          })}
        </div>       
      </div>
      <hr></hr>

      <div className='chat'>        
          <div className='individ'>
            <div className='persImg'>
              <img className='persImg' src={curentChat.friendImg} alt=''></img>
            </div>
            <div className='individName'>
              {curentChat.friendName}
            </div>               
          </div>

        <div className='chatArea'>
            <div>
            {curentChat.friendData.map((item)=>{
                return <div className='message' >{item}</div>
              })
            }          
            </div>       
        </div>
        <div className='textArea'>
          <input placeholder='Message' type="text" ref={inputRef} onKeyDown={handleSubmitMessage}></input>
          <button id='sendButton' onClick={handleClickMessage} >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;