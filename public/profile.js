let data = {};
function changeHandler(key, value) {
  console.log(key, value);
  data[key] = value;
  console.log(data);
}
