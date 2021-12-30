
texts = [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

]
var i = 0;
function nextText() {
      var output = texts[i % texts.length].split(' ');

      var output2 = [];
      for (var j = 0; j < output.length;) {
            if (output[j + 1])
                  output2.push(output[j] + " " + output[j + 1] + " ")
            else
                  output2.push(output[j] + " ")

            j += 2;
      }

      $('#text').html(output2)
      i++;
}





$("#form").on("submit", (e) => {
      e.preventDefault()
      // $('#exampleModalCenter').modal('toggle')
      $('#modal-container').addClass('out');
      $('body').removeClass('modal-active');
      submitToServer()

      closeModal()

})

async function submitToServer() {


      if (!$('#input-box').val())
            return
      else {
            url = "https://navaragam.herokuapp.com/compose"
            data = {
                  "sentence": $("#input-box").val()
            }
            console.log(data);

            const response = await fetch(url, {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  credentials: "same-origin",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            })
            $('.bottom-right').addClass('notify')
                  .addClass(' do-show');
            setInterval(() => {
                  $('.bottom-right').removeClass('do-show')
            }, 3000)
      }

}


$(window).on("click", () => {
      nextText()
})

$(window).ready(() => {
      setInterval(() => {
            nextText()
            // $('body').click()  
      }, 5000);
})

function getSentence() {
      count = 10
      url = "https://navaragam.herokuapp.com/quotes/" + count
      const response = fetch(url)

      response.then((res) => {
            return res.json()
      }).then(res => {
            for (var i = 0; i < res.length; i++)
                  texts.push(res[i]["sentence"])
      })

}

getSentence()



// $(document).ready(function(){
//       $('.floatingButton').on('click',
//           function(e){
//               e.preventDefault();
//               $(this).toggleClass('open');
//               if($(this).children('.fa').hasClass('fa-plus'))
//               {
//                   $(this).children('.fa').removeClass('fa-plus');
//                   $(this).children('.fa').addClass('fa-close');
//               } 
//               else if ($(this).children('.fa').hasClass('fa-close')) 
//               {
//                   $(this).children('.fa').removeClass('fa-close');
//                   $(this).children('.fa').addClass('fa-plus');
//               }
//               $('.floatingMenu').stop().slideToggle();
//           }
//       );
//       $(this).on('click', function(e) {

//           var container = $(".floatingButton");
//           // if the target of the click isn't the container nor a descendant of the container
//           if (!container.is(e.target) && $('.floatingButtonWrap').has(e.target).length === 0) 
//           {
//               if(container.hasClass('open'))
//               {
//                   container.removeClass('open');
//               }
//               if (container.children('.fa').hasClass('fa-close')) 
//               {
//                   container.children('.fa').removeClass('fa-close');
//                   container.children('.fa').addClass('fa-plus');
//               }
//               $('.floatingMenu').hide();
//           }

//           // if the target of the click isn't the container and a descendant of the menu
//           if(!container.is(e.target) && ($('.floatingMenu').has(e.target).length > 0)) 
//           {
//               $('.floatingButton').removeClass('open');
//               $('.floatingMenu').stop().slideToggle();
//           } 
//       });
//   });


$('#four').click(function () {
      if (!$('body').hasClass('modal-active')) {
            var buttonId = $(this).attr('id');
            $('#modal-container').removeAttr('class').addClass(buttonId);
            $('body').addClass('modal-active');
            $('.floatingButton').addClass('open');
            $('#icon').removeClass('fa-plus').addClass('fa-close')
            // .addClass('fa-close')

      }
      else {
            var buttonId = $(this).attr('id');
            $('#modal-container').removeAttr('class').addClass('scale')
            $('body').removeClass('modal-active');
            $('#icon').removeClass('fa-close').addClass('fa-plus')
      }
})



function closeModal() {
      $('#modal-container').addClass('out');
      $('body').removeClass('modal-active');
      $('#icon').removeClass('fa-close').addClass('fa-plus')
}

$("#closeBtn").on('click', closeModal)


//  $(document).on("click",()=>{
//       if($('body').hasClass('modal-active'))
//             $('.floatingMenu').addClass('open')
//       else
//             $('.floatingMenu').removeClass('open')
//  })
