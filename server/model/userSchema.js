const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 loanNo: {
        type: String,
        unique: true,
      },
    
firstname:{
    type: 'string',

},
lastname:{
    type: 'string',

},
email:{
    type: 'string',


},
phoneno:{
    type:"number",

},
// address:{
//     type:"string",

// },
city:{
    type:"string",

},
pincode:{
    type:"number",

},
states:{
    type: 'string',

},
country:{
    type: 'string',


},
// aadharno:{
//     type:"Number",

// },
// panno:{
//     type:"string",

// },
selectedBank:{
    type:"string",

},
todebit:{
    type:"string",

},
accountno:{
    type:"number",

},
vaccountno:{
    type:"number",

},
ifsc:{
    type:"string",

},
amountdigits:{
    type:"number",

},
// amountwords:{
//     type:"string",

// },
dob:{
    type:"date",

},
name_of_service:{
    type:"string",

},


},{ timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastUser = await User.findOne({}, {}, { sort: { createdAt: -1 } });
      let lastLoanNo = 'SUV00000';
      if (lastUser && lastUser.loanNo) {
        lastLoanNo = lastUser.loanNo;
      }
  
      const currentNumber = parseInt(lastLoanNo.substring(3)) + 1;
      const newLoanNo = `SUV${currentNumber.toString().padStart(5, '0')}`;
      this.loanNo = newLoanNo;
    }
  
    next();
  });

const User =mongoose.model("USER",userSchema);

module.exports = User;
