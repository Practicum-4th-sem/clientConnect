// const axios = require("axios");
let data = {};
function changeHandler(key, value) {
  console.log(key, value);
  data[key] = value;
  console.log(data);
}

async function submitHandler() {
  const res = await axios.patch("/updateProfile", data);
  console.log(res.data);
}
