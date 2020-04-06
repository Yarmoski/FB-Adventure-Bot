const alpha = require("@alpha-manager/core");
const AlphaFB = require("@alpha-manager/fb");
const fb = new AlphaFB().config({
  id: 103793077750716, // the page id, must be a number
  token:
    "EAACVS6jUj0QBAGC9FhIZCKZCJNlJtKYaIZBggrtBPoAODinkUsV0FMNWxCcABqvDloExZBZC1tw4oomnOYUKUDe8QLwPbF4JRZAybOnkH9Tv7w1OhMDhfJlVnmtfDnqlgVG8hDwNcKZA123Pz9nVZAMBiFjfZB1IWoOqvKENHobQPVXFwvOocKchq" // the access token, must be a string
});

let lottoNumber1 = Math.floor(Math.random() * 99) + 1;
let lottoNumber2 = Math.floor(Math.random() * 99) + 1;
let lottoNumber3 = Math.floor(Math.random() * 99) + 1;
let lottoNumber4 = Math.floor(Math.random() * 99) + 1;
let lottoNumber5 = Math.floor(Math.random() * 99) + 1;
let lottoNumber6 = Math.floor(Math.random() * 99) + 1;

let postContents = `Lottery Prediction:\n${lottoNumber1} ${lottoNumber2} ${lottoNumber3} ${lottoNumber4} ${lottoNumber5} ${lottoNumber6}`;

fb.get.posts
  .latest()
  .then(latestPost => {
    fb.get
      .reactions(latestPost.id)
      .then(reactions => {
        for (var i = 0; i < reactions.length; i++) {
          var obj = reactions[i];
          console.log(obj.type);
        }
      })
      .catch(err => console.log(err));
    fb.get
      .comments(latestPost.id)
      .then(comments => {
        for (var i = 0; i < comments.length; i++) {
          var obj = comments[i];
          console.log(obj.message);
        }
      })
      .catch(err => console.log(err));
  })
  .catch(error => console.error(error));

const myTask = new alpha.Task()
  .to(fb) //the alphaFB instance we configured earlier
  .do(actionObject => {
    actionObject.type = "post";
    actionObject.message = postContents;
    actionObject.done();
  })
  .every(10)
  .second()
  .start();

FB.api("me/feed", "post", { message: postContents }, res => {
  if (!res || res.error) {
    return console.error(!res ? "error occurred" : res.error);
  }
  console.log(`Post ID: ${res.id}`);
});

// get all posts / comments / reactions (t)
//id = page id
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

FB.api(
  "/your-object-id",
  "GET",
  { fields: "reactions.type(LOVE).limit(0).summary(total_count)" },
  function(response) {
    console.log(response);
  }
);

getAll("reaction", 103793077750716_117302276399796, "", function(response) {
  console.log(response);
});
