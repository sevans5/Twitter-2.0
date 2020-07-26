
// getting list of most recent tweets
async function fn1() {

const result = await axios({
    method: 'get',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
});


// let myJSON = JSON.stringify(result.data);  

// console logging x shows all objects
for (let i=0; i<result.data.length;i++) {
  let x = result.data[i];
  //console.log(x);

  if(result.data[i].isMine) {
    let tweet = `<div class="tweet box" id="${result.data[i].id}">
                <div>
                  <article class="media">
                    <h2 class="is-medium"><strong>${result.data[i].author} ${result.data[i].type + "ed: "}</strong></h2>
                </div>
                <div class="bodyoftweet" id="${result.data[i].id}body">
                  <p>${result.data[i].body}</p>
                </div>
                <div class="bottomOfTweet level-left">
                  <button class="button bomttom" id="${result.data[i].id}retweetbutton">${"retweet"}</button>
                    ${" "}<p class="is-inline" id="${result.data[i].id}retweet">${result.data[i].retweetCount} </p>
                  <button class="button bottom" id="${result.data[i].id}likebutton">${"like"}</button>
                    ${" "}<p class="is-inline" id="${result.data[i].id}like">${result.data[i].likeCount}</p>
                  <button class="button bottom" id="${result.data[i].id}replybutton">${"reply"}</button>
                    ${" "}<p class="is-inline" id="${result.data[i].id}reply">${result.data[i].replyCount}</p>

                </div>
                <div class="level-right">    
                  <button class="button leftcorner" id="${result.data[i].id}editbutton">${"edit"}</button>
                  <button class="button leftcorner" id="${result.data[i].id}deletebutton">${"delete"}</button>
                </div>
                </div>
                  </article> 
                </div>`;

              
              $(".feed").append(tweet);

              if(result.data[i].isLiked) {
                $('#'+ result.data[i].id + "likebutton").css("background-color", "#DD7975");
              }

              if(result.data[i].type == "retweet"){
                if(result.data[i].parent != null){
                    $('#' + result.data[i].id + 'body').append(
                      `<div class="box level-left" id="retweetbox">
                        <div class="is-medium"><strong>${result.data[i].parent.author}</strong></div>
                        <div>
                        <span id="${result.data[i].parent.id}body">${result.data[i].parent.body}</span>   
                        <div>
                      </div>`);
                }
    
            }
             
              
  } else {
    let tweet = `<div class="tweet box" id="${result.data[i].id}">
                <div>
                  <article class="media">
                  <h2 class="is-medium"><strong>${result.data[i].author} ${result.data[i].type + "ed: "}</strong></h2>
                </div>
                <div class="bodyoftweet is-level-left" id="${result.data[i].id}body">
                  <p>${result.data[i].body}</p>
                </div>
                <div class="bottomOfTweet level-left">
                  <button class="button rt" id="${result.data[i].id}retweetbutton">${"retweet"}</button>
                  </br>
                  <p class="is-inline"id="${result.data[i].id}retweet">${result.data[i].retweetCount} </p>
                  <button class="button like" id="${result.data[i].id}likebutton">${"like"}</button>
                  </br>
                  <p class="is-inline" id="${result.data[i].id}like">${result.data[i].likeCount}</p>
                  <button class="button" id="${result.data[i].id}replybutton">${"reply"}</button>
                  </br>
                  <p class="is-inline" id="${result.data[i].id}reply">${result.data[i].replyCount}</p>
                </article>  
                </div>
              </div>`;

              $(".feed").append(tweet);

              // color in button if it has been liked 
              if(result.data[i].isLiked) {
                $('#'+ result.data[i].id + "likebutton").css("background-color", "#DD7975");
              }

              if(result.data[i].type == "retweet"){
                if(result.data[i].parent != null){
                    $('#' + result.data[i].id + 'body').append(
                      `<div class="box level-left" id="retweetbox">
                        <div id="parentName is-medium"><strong>${result.data[i].parent.author}</strong></div>
                        <div>
                        <span id="${result.data[i].parent.id}body">${result.data[i].parent.body}</span>  
                        <div> 
                      </div>`);
                }
    
            }
              
  }
  
  


// event handlers 
$(`#${result.data[i].id}retweetbutton`).on("click", null, result.data[i], rtFunc); 
$(`#${result.data[i].id}likebutton`).on("click", null, result.data[i], likeFunc); 
$(`#${result.data[i].id}replybutton`).on("click", null, result.data[i], replyFunc); 

$(`#${result.data[i].id}editbutton`).on("click", null, result.data[i], editFunc); 
$(`#${result.data[i].id}deletebutton`).on("click", null, result.data[i], deleteFunc); 


}
}

fn1(); 

 // creating a new tweet in the DB
 async function fn2() { 
  
      var tweet;


      $('.creating').on("click", function() {
        if(document.getElementById("newtweet") == null){
          $(newTweet).append(`<div id="newtweet" class="container text-justify-center" style="width:400px">
          <textarea class="textarea" style="width: 40%" id="tweetbody" placeholder="Tweet Something"></textarea>
          <button class="button send">Compose Tweet</button>
          <button class="button cancel">Cancel</button>
          </div>`); 
        }
      
          $('.send').on("click", async function(){
            tweet = document.getElementById("tweetbody").value;
            console.log(tweet); 
      
      
            const result = await axios({
              method: 'post',
              url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
              withCredentials: true,
              data: {
                  body: tweet
              },
            });

            window.location.reload(true); 
      
            document.getElementById("tweetbody").value = ""; 
      
      
          });

          $(".cancel").on("click", function(){
            $("#newtweet").remove();
          }); 
  }); 
}

  
  fn2(); 

// called when the rt button is pressed 
async function rtFunc(element) {
  // event.preventDefault(); 
  // event.stopPropagation();
  
  let retweeted = false; 
  // append retweet form onto target tweet
  let parent = element.data.id;
  $('#' + parent).append(
      `<div id="${element.data.id}retweetHolder">
     
        <textarea id="${element.data.id}retweetContent" class="textarea" placeholder="Quote This Tweet By Adding Additional Text (optional)"></textarea>
        <button class="button is-inline" id="${element.data.id}submitRetweet" class="button level-right">Confirm</button>
        <button class="button is-inline" id="${element.data.id}cancelRetweet" class="button level-right">Cancel</button>
     
      </div>`
  );

  // only render retweet form once
  $('#' + parent).attr("id", `${parent}once`);

    // submit the retweet
    $('#' + parent + 'submitRetweet').on("click", async function(){
      // event.stopPropagation();
      let retweetVal = $('#' + parent + 'retweetContent').val();

      // let totalTweet = retweetVal + "tweet from " + element.data.author + "- " + element.data.body;
      const retweetResult = await axios({
          method: 'post',
          url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
          withCredentials: true,
          data: {
            "type": "retweet",
            "parent": parent,
            "body": retweetVal,
          },
      });
      window.location.reload(true); 
  // showing that the tweet has +1 retweets now
  document.getElementById(element.data.id + "retweet").innerHTML = parseInt(document.getElementById(element.data.id + "retweet").innerHTML) + 1; 
    });

    // cancel the retweet
    $('#' + parent + 'cancelRetweet').on("click", function(){
      $('#' + parent + 'retweetHolder').remove();
      // event.stopPropagation();      
      $('#' + parent + 'once').attr("id", `${parent}`);

    });
  
}


// caled when the like button is pressed
async function likeFunc(element) {
  // unlike it
  // console.log('here'); 
  if(element.data.isLiked) {
    const result1 = await axios({
      method: 'put',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + element.data.id + '/unlike',
      withCredentials: true,
    });
    
    document.getElementById(element.data.id + "like").innerHTML = parseInt(document.getElementById(element.data.id + "like").innerHTML) - 1; 
    // $('#'+ element.data.id + likebutton).css("color", "#E89E9D"); 
    // console.log(document.getElementById(element.data.id + "like").innerHTML);   
    $('#'+ element.data.id + "likebutton").css("background-color", "white");  
    element.data.isLiked = false; 
  } else {
    const result = await axios({
      method: 'put',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + element.data.id + '/like',
      withCredentials: true,
    });

    document.getElementById(element.data.id + "like").innerHTML = parseInt(document.getElementById(element.data.id + "like").innerHTML) + 1; 
    // console.log(document.getElementById(element.data.id + "like").innerHTML);     
    $('#'+ element.data.id + "likebutton").css("background-color", "#DD7975"); 
    element.data.isLiked = true; 
  }

}

// called when the reply button is pressed 
async function replyFunc(element) {   

  let parent = element.data.id;
  
  $("#" + parent).append(
    `<div id="${element.data.id}reply">
    <textarea class="textarea" id="${element.data.id}replytext"></textarea>
    <div>
    <button class="button is-inline" id="${element.data.id}submitreply">Submit</button>
    <button class="button is-inline" id="${element.data.id}cancelreply">Cancel</button>
    </div>
    </div>
    `
  );  

  $('#' + parent).attr("id", `${parent}once`);

  $('#' + parent + 'submitreply').on("click", async function(){
    let replyVal = $('#' + parent + 'replytext').val();

    if(replyVal != ""){
      const result = await axios({
      method: 'post',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        "type": "reply",
        "parent": parent,
        "body": replyVal,
      },
      });
      window.location.reload(true);
    }
});

    $('#' + parent + 'cancelreply').on("click", function(){
      $('#' + parent + 'reply').remove();
      $('#' + parent + 'once').attr("id", `${parent}`);

    });
}

async function editFunc(element) {
  //console.log("here"); 
  //preventDefault();

  let former = element.data.body; 

  $('#' + element.data.id + 'body').replaceWith(
    `<div id="${element.data.id}editsection">
    <textarea class="textarea"id="${element.data.id}edit">${former}</textarea>
    <div>
    <button class="button is-inline" id="${element.data.id}submitedit">Submit</button>
    <button class="button is-inline" id="${element.data.id}canceledit">Cancel</button>
    </div>
    </div>
    `
  );   
  $('#' + element.data.id +'submitedit').on("click", async function() {
    let newTweet = $('#' + element.data.id + 'edit').val(); 
    const result = await axios({
      method: 'put',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + element.data.id,
      withCredentials: true,
      data: {
          body: newTweet
      },
    });
  window.location.reload(true);

  }); 
  

  $('#' + element.data.id + 'canceledit').on("click", function(){
    $('#' + element.data.id + 'edit').replaceWith(
       ` <span id="${element.data.id}body">${former}</span>`
    );
    window.location.reload(true);
  });
 
}

async function deleteFunc(element) {
  // console.log("here"); 

  if(element.data.isMine) {
    const result = await axios({
      method: 'delete',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + element.data.id,
      withCredentials: true,
    });

  window.location.reload(true);
  }
}

 



//  // getting details about a specific tweet
//   const result = await axios({
//     method: 'get',
//     url: 'https://comp426fa19.cs.unc.edu/a09/tweets/12',
//     withCredentials: true,
//   });

//   // updates a specific tweet 
//   // can only update tweets you created
//   const result = await axios({
//     method: 'put',
//     url: 'https://comp426fa19.cs.unc.edu/a09/tweets/13',
//     withCredentials: true,
//     data: {
//       body: "Great shot, kid! That was one in a million!"
//     },
//   });

 

  

  


