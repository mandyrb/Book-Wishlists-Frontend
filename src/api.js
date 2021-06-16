import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API Class - Static class tying together methods used to get/send to to the API.

class MyBooklistApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `${MyBooklistApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }

//  /** Get all companies. */
//   static async getCompanies() {
//     let res = await this.request(`companies`);
//     return res.companies;
//   }

//     /** Get companies with search term*/
//    static async getCompaniesSearch(searchTerm) {
//     let res = await this.request(`companies?name=${searchTerm}`);
//     return res.companies;
//   }

//    /** Get all jobs. */
//    static async getJobs() {
//     let res = await this.request(`jobs`);
//     return res.jobs;
//   }

//   /** Getjobs with search term. */
//   static async getJobsSearch(searchTerm) {
//     let res = await this.request(`jobs?title=${searchTerm}`);
//     return res.jobs;
//   }

  /** Login*/
  static async login(username, password) {
    let res = await this.request("auth/login", {username:username, password:password}, "post");
    return res.token;
  }

  /** Sign up*/
  static async signup(firstName, username, password) {
    let res = await this.request("auth/register", {firstName:firstName, username:username, password:password}, "post");
    return res.token;
  }

  /** Get current user*/
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

export default MyBooklistApi;



