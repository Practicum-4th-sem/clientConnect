/* eslint-disable */

import { buyPost } from "./stripe.js";
// const { buyPost } = require("./stripe");
const btn = document.getElementById("buyBtn");

console.log(btn);

if (btn) {
  btn.addEventListener("click", (e) => {
    console.log(btn);
    e.target.textContent = "Processing...";
    const { postId } = e.target.dataset;
    buyPost(postId);
  });
}
