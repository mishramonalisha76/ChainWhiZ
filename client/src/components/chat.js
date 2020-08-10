// import React, { Component } from "react";
// import Box from '3box';


// export default class Chat extends Component {
//     async componentWillMount(){
//         const box = await Box.openBox("0x0E16571A72f36743e53B15c2aF412cfEC9EA4223", window.ethereum, {});
//      this.setState({box:box});
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             space:null,
//             thread:null,
//             posts:null,
//             userList:null,
//             box:null
//         }
//     }

//     async createSpace() {
//         const space = await this.state.box.openSpace('mySpace')
//         console.log(space);
//         this.setState({ space: space });
//     }

//     async createThread() {
//         const thread = await this.state.space.joinThread('myThread', {
//             ghost: true,
//             ghostBacklogLimit: 20 // optional and defaults to 50
//         })
//         this.setState({ thread: thread });
//     }

//     async viewPosts() {
//         const posts = await this.state.thread.getPosts()
//         console.log(posts)

//         // you can also specify a number of posts you want
      
//         console.log(posts)
//         this.setState({ posts: posts });
//     }
//     async updatePosts() {
//        this.state. thread.onUpdate(async() => {
//             const posts = await this.state.thread.getPosts()
//             console.log(posts)
//             this.setState({ posts: posts });
//         })
//     }
//     async viewMembers() {
//         const userList = await this.state.thread.listMembers()
//         this.setState({ userList: userList });
//     }
//     async addPosts(msg) {
//         await this.state.thread.post(msg);
//     }
//     async leaveThread() {
//         await this.state.thread.close();
//     }

//     render() {
//         return (
//            <div>
//             <h1>Chat</h1>
            
//             <button onClick={async()=>{await this.createSpace;await this.createThread()}}>
//                 Create chat
//             </button>
//             <button onClick={async()=>{await this.createThread()}}>
//                 Join chat
//         </button>

//         <button>
//             Show posts
//         </button>

//         </div>


//         )


//     }




// }