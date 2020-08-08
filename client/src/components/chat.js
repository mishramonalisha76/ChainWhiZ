import React, { Component } from "react";
import Box from '3box';


export default class Chat extends Component {


    constructor(props) {
        super(props);
        this.state = {
            space=null,
            thread=null,
            posts=null,
            userList=null
        }
    }

    async createSpace() {
        const space = await box.openSpace('mySpace')
        console.log(space);
        this.setState({ space: space });
    }

    async createThread() {
        const thread = await this.state.space.joinThread('myThread', {
            ghost: true,
            ghostBacklogLimit: 20 // optional and defaults to 50
        })
        this.setState({ thread: thread });
    }

    async viewPosts() {
        const posts = await this.state.thread.getPosts()
        console.log(posts)

        // you can also specify a number of posts you want
        const posts = await this.state.thread.getPosts(20)
        console.log(posts)
        this.setState({ posts: posts });
    }
    async updatePosts() {
        thread.onUpdate(() => {
            const posts = await thread.getPosts()
            console.log(posts)
            this.setState({ posts: posts });
        })
    }
    async viewMembers() {
        const userList = await thread.listMembers()
        this.setState({ userList: userList });
    }
    async addPosts(msg) {
        await thread.post(msg);
    }
    async leaveThread() {
        await thread.close();
    }

    render() {
        return (
           <div>
            <h1>Chat</h1>
            
            <button onClick={async()=>{await this.createSpace;await this.createThread()}}>
                Create chat
            </button>
            <button onClick={async()=>{await this.createThread()}}>
                Join chat
        </button>

        <button>
            Show posts
        </button>

        </div>


        )


    }




}