
import * as mongoose from "mongoose";

export interface User {
  id?: string
  name?: string
  email: string
  phoneNo?: string
  streetAddress?: string
  city?: string
  state?: string
  password?: string
 
  

}


export interface userTest {
  status: number
  token?: string
}


