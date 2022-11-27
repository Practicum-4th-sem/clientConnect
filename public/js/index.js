/* eslint-disable */
// import "@babel/polyfill";
import { buyPost } from "./stripe";

const btn = document.getElementById("buyBtn");
console.log("hello");
// console.log(btn);

if (btn) {
  btn.addEventListener("click", (e) => {
    console.log(btn);
    e.target.textContent = "Processing...";
    const { postId } = e.target.dataset;
    buyPost(postId);
  });
}
// console.log("hello parcel");
