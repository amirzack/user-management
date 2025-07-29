import axios from "axios";
/*
* ای پی آی کاربرها از سمت  سایت reqres.in دریافت می شود 
به صورت فیک دیتا و از پیش تولید شده است
*/
export const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 10000,
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});
