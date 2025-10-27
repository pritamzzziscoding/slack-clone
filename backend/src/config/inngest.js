import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { ENV } from "./env.js";
import { User } from "../models/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

//creating function for adding data to mongodb when user is created
const syncUser = inngest.createFunction(
    {id : "sync-user"},
    {event : "clerk/user.created"}, //this has to be exactly the same
    
    async ({event}) => {
        await connectDB(ENV.MONGO_URI)

        //extracting the necessary data from the event object
        const {id, email_addresses, first_name, last_name, image_url} = event.data

        const newUser = {
            clerkId : id,
            email : email_addresses[0].email_address,
            name : `${first_name} ${last_name}`,
            image_url : image_url
        }
        await User.create(newUser)
    }
)

//Create a function for deleting a user upon hitting the user.delete event

const deleteUserFromDB = inngest.createFunction(
    {id : "delete-user"},
    {event : "clerk/user.deleted"}, // this has to be exactly same

    async ({event}) => {
        await connectDB(ENV.MONGO_URI)
        const {id} = event.data // get the id from the event.data object
        await User.deleteOne({clerkId : id})
        // await deleteStreamUser(id.toString());
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];