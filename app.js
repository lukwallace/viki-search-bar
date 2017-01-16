// Basic API request
const queryViki = (str, callback) => {
  console.log('Searching:', str);
  if(str.length > 0){
    $.ajax({
      method: 'GET',
      url: 'https://api.viki.io/v4/search.json',
      data: { c: str, per_page: 5, with_people: true, app: '100266a', t: Date.now() },
    })
    .done((data) => {
      console.log(data);
      callback(data);
    });
  }
};

// Custom no throttle function to avoid throttling API requests
const noThrottle = (func) => {
  let count = 0;
  return function() {
    count++;
    const args = Array.prototype.slice.call(arguments);
    setTimeout(function() {
      if(count == 1) {
        func.apply(null, args);
      }
      count--;
    }, 500);
  };
};

const insertOptions = (data) => {
  // $('#list').html();
  data.forEach((obj) => {
    $('#list').append('<option>'+ obj.tt + '</option>');
  });
};

const tqueryViki = noThrottle(queryViki);
$(document).ready(() => {
  console.log('DOM ready!');
  $('#input').on('keyup', function(e) {
    if(e.keyCode >= 48 && e.keyCode <= 57 ||
       e.keyCode >= 65 && e.keyCode <= 90 ||
       e.keyCode === 8) {
      tqueryViki($(this).val(), insertOptions);
    }
  });
});


// Basic Tests
//////////////

// let dummy = 0;
// const add = (x) => {
//   dummy += x;
//   console.log(dummy);
// };

// const tAdd = noThrottle(add);
// tAdd(3);
// tAdd(3);
// tAdd(3);
// tAdd(3); // Should only add 3 once.
