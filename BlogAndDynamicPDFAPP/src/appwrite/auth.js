import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
//this is appwrite based service
//note: for promises use async await

/// if any backend service  change then just change here


export class AuthService {
    client = new Client();//written from appwrite.config
    account;

    constructor() {//1 set up client  https://appwrite.io/docs/products/auth/quick-start
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) { // we can use firebase also instead of appwrite just follow those documentation and create rest things like constructor and constructor and call those things
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);// async untill create acount we can tgo forward
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();//when ever this object create we need to create client  thats why we created constructed
//PTL 1
export default authService


