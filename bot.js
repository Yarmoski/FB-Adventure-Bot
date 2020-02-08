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

// get all posts / comments / reactions (t)
//f = fields
let getAll = (t, id, f, cb = () => {}, res = null, arr = []) => {
  let af = "";
  if (res && res.paging && res.paging.next) {
    let next = res.paging.next.match(/after=(.*)/)[0];
    af = "&" + next;
  }
  FB.api(`${id}/${t}?limit=100${af}${f}`, (res, err) => {
    if (err) {
      return;
    } else {
      if (!res.data.length && !arr.length) {
        cb(arr);
        return;
      }
      if (af.length == 0 && arr.length > 1) {
        cb(arr);
        return;
      } else {
        if (!arr.length) arr = res.data;
        else arr = arr.concat(res.data);
        if (
          res.paging.cursors.before == res.paging.cursors.after &&
          res.paging.cursors != undefined
        )
          cb(arr);
        else getAll(t, id, f, cb, res, arr);
      }
    }
  });
};
