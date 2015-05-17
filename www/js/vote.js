$(document).ready(function () {
        var date = new Date();

        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();

        var fb = new Firebase('https://dev-vote-app.firebaseio.com/'), //firebase connect
            vote = fb.child('Voting'),
            year = vote.child(y),
            month = year.child(m),
            day = month.child(d);

        var msg = new Firebase("https://dev-vote-app.firebaseio.com/Отзывы"); //firebase feedback connect

        // creates a new, incremental records
        $('#inc1').on('click', goodVote);
        $('#inc2').on('click', normalVote);
        $('#inc3').on('click', badVote);
        $('#submit').on('click', submitMsg);


        function blockButton() {
            //Block buttons and Set timeout
            $('#inc1, #inc2, #inc3').prop("disabled", true);

            setTimeout(function () {
                $('#inc1, #inc2, #inc3').prop('disabled', false);

            }, 5000); //Set vote timeout
        }

        function thankForVote() {
            swal("Дякуємо за оцінку!", "Ваша думка важлива для нас", "success");
        }

        var errId = 0;
        // creates a new, incremental record
        function goodVote() {


            vote.push({
                assessment: "good",
                timestamp: Date.now()
            });

            thankForVote();
            blockButton();


        }

        //second

        function normalVote() {

            vote.push({
                assessment: "normal",
                timestamp: Date.now()
            });

            thankForVote();
            blockButton();


        }

        //third

        function badVote() {

            vote.push({
                assessment: "bad",
                timestamp: Date.now()
            });

            thankForVote();
            blockButton();


        }

        function submitMsg() {

            var name = $('#nameInput').val();
            var text = $('#messageInput').val();

            if (name && text !== "") //check if not empty
            {
                msg.push({
                    name: name,
                    text: text,
                    timestamp: Date.now()
                });
                $('#messageInput').val('');
                $('#nameInput').val('');

                swal("Дякуємо за відгук!", "Ваша думка важлива для нас", "success");
                $('#exampleModal').modal('hide'); //close modal
            }

            else {
                alert("Введіть ім'я та повідомлення");
            }
        }

    }
);




