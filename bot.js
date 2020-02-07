const FB = require("fb");

FB.setAccessToken(
  "EAACVS6jUj0QBAGC9FhIZCKZCJNlJtKYaIZBggrtBPoAODinkUsV0FMNWxCcABqvDloExZBZC1tw4oomnOYUKUDe8QLwPbF4JRZAybOnkH9Tv7w1OhMDhfJlVnmtfDnqlgVG8hDwNcKZA123Pz9nVZAMBiFjfZB1IWoOqvKENHobQPVXFwvOocKchq"
);

let lottoNumber1 = Math.floor(Math.random() * 99) + 1;
let lottoNumber2 = Math.floor(Math.random() * 99) + 1;
let lottoNumber3 = Math.floor(Math.random() * 99) + 1;
let lottoNumber4 = Math.floor(Math.random() * 99) + 1;
let lottoNumber5 = Math.floor(Math.random() * 99) + 1;
let lottoNumber6 = Math.floor(Math.random() * 99) + 1;

let postContents = `Lottery Prediction:\n${lottoNumber1} ${lottoNumber2} ${lottoNumber3} ${lottoNumber4} ${lottoNumber5} ${lottoNumber6}`;

FB.api("me/feed", "post", { message: postContents }, res => {
  if (!res || res.error) {
    return console.error(!res ? "error occurred" : res.error);
  }
  console.log(`Post ID: ${res.id}`);
});
