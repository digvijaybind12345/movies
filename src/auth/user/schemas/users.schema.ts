import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid'

// NOTE: Follow one standard, either use the @Schema or 
export const Users = new mongoose.Schema({

  id: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true,

  },
  streetAddress: {
    type: String,
    nullable: false
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  phoneNo: {
    type: String,
    validate: {
      validator: function (v) {
        if (v) {
          return /^[0-9]{10}/.test(v);
        }
      },
      message: '{VALUE} is not a valid 10 digit number!'
    },
    nullable: true,
    default: null
  },
  
 
  
 
  

})

export const user = mongoose.model('User', Users);
