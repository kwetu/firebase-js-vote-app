$(document).ready(function () {

        var fb = new Firebase('https://vote-app.firebaseio.com/'), //firebase connect
            golos = fb.child('Голосование'),
            gd = golos.child('Хорошо'),
            nm = golos.child('Нормально'),
            bd = golos.child('Плохо'),

            voteGd = gd.child('Голосов'),
            voteNm = nm.child('Голосов'),
            voteBd = bd.child('Голосов'),

            msg = fb.child("Отзывы"); //firebase feedback


        // creates a new, incremental records
        $('#inc1').on('click', incId1);
        $('#inc2').on('click', incId2);
        $('#inc3').on('click', incId3);

        //onclick submit func
        $('#submit').on('click', submitMsg);


        function blockButton() {
            //Block buttons and Set timeout
            $('#inc1, #inc2, #inc3').prop("disabled", true);

            setTimeout(function () {
                $('#inc1, #inc2, #inc3').prop('disabled', false);

            }, 5000); //Set vote timeout
        }

        var errId = 0;
        // creates a new, incremental record
        function incId1() {

            // increment the counter
            voteGd.transaction(function (currentValue) {
                return (currentValue || 0) + 1;
            }, function (err, committed, ss) {
                if (err) {
                    setError(err);
                }
                else if (committed) {
                    // if counter update succeeds, then create record
                    // probably want a recourse for failures too
                    //addRecord(ss.val());
                }
            });

            //Sweet Alert
            swal("Дякуємо за оцінку!", "Ваша думка важлива для нас", "success");

            blockButton(); //Block buttons to vote

        }

        //second

        function incId2() {

            // increment the counter
            voteNm.transaction(function (currentValue) {
                return (currentValue || 0) + 1;
            }, function (err, committed, ss) {
                if (err) {
                    setError(err);
                }
                else if (committed) {
                    // if counter update succeeds, then create record
                    // probably want a recourse for failures too
                    addRecord(ss.val());
                }
            });

            //Sweet Alert
            swal("Дякуємо за оцінку!", "Ваша думка важлива для нас", "success");

            blockButton();
        }

        //third

        function incId3() {

            // increment the counter
            voteBd.transaction(function (currentValue) {
                return (currentValue || 0) + 1;
            }, function (err, committed, ss) {
                if (err) {
                    setError(err);
                }
                else if (committed) {
                    // if counter update succeeds, then create record
                    // probably want a recourse for failures too
                    //addRecord(ss.val());
                }
            });

            //Sweet Alert
            swal("Дякуємо за оцінку!", "Ваша думка важлива для нас", "success");

            blockButton();

            //experimental
            //bd.child('Время оценки').push({
            //    timestamp: Firebase.ServerValue.TIMESTAMP
            //});

        }


        //add new msg to firebase
        function submitMsg() {

            var name = $('#nameInput').val();
            var text = $('#messageInput').val();

            if (name && text !== "") {
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
                alert("Enter name and message!");
            }

        }

        function setError(msg) {
            var id = ++errId;
            $('body').append('<p id="err' + id + '">' + msg + '</p>');
            setTimeout(function () {
                $('#err' + id).fadeOut();
            }, 2500);
        }
    }
);




