$(document).ready(function () {

        var fb = new Firebase('https://vote-app.firebaseio.com/'), //firebase connect
            golos = fb.child('Голосование'),
                gd = golos.child('Хорошо'),
                nm = golos.child('Нормально'),
                bd = golos.child('Плохо');
        var msg = new Firebase("https://vote-app.firebaseio.com/Отзывы"); //firebase feedback connect


        // creates a new, incremental records
        $('#inc1').on('click', incId1);
        $('#inc2').on('click', incId2);
        $('#inc3').on('click', incId3);
        $('#submit').on('click', submitMsg);


        function blockButton() {
            //Block buttons and Set timeout
            $('#inc1').prop("disabled", true);
            $('#inc2').prop("disabled", true);
            $('#inc3').prop("disabled", true);

            setTimeout(function () {
                $('#inc1').prop('disabled', false);
                $('#inc2').prop('disabled', false);
                $('#inc3').prop('disabled', false);

            }, 5000); //Set vote timeout
        }

        var errId = 0;
        // creates a new, incremental record
        function incId1() {

            //Sweet Alert
            swal("Спасибо за оценку!", "Ваше мнение важно для нас", "success");

            // increment the counter
            gd.child('Голосов').transaction(function (currentValue) {
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

            blockButton(); //Block buttons to vote


        }

        //second

        function incId2() {
            //Sweet Alert
            swal("Спасибо за оценку!", "Ваше мнение важно для нас", "success");
            // increment the counter

            nm.child('Голосов').transaction(function (currentValue) {
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

            blockButton();
        }

        //third

        function incId3() {
            //Sweet Alert
            swal("Спасибо за оценку!", "Ваше мнение важно для нас", "success");


            bd.child('Голосов').transaction(function (currentValue) {
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

            blockButton();

            //experimental
            //bd.child('Время оценки').push({
            //    timestamp: Firebase.ServerValue.TIMESTAMP
            //});

        }




        ////add new msg to firebase
        //function submitMsg(err, committed) {
        //    if (err) { //check errors
        //        console.log('msg submiting error');
        //        $('#messageInput').val('');
        //        $('#nameInput').val('');
        //    }
        //    else if (committed) { //submit data
        //        var name = $('#nameInput').val();
        //        var text = $('#messageInput').val();
        //        msg.push({name:name, text:text});
        //        $('#messageInput').val('');
        //        $('#nameInput').val('');
        //
        //        swal("Спасибо за отзыв!", "Ваше мнение важно для нас", "success"); //sweet alert
        //    }
        //
        //}

        //add new msg to firebase
        function submitMsg() {

            var name = $('#nameInput').val();
            var text = $('#messageInput').val();

            if (name && text !== "") //check if not empty
            {
                msg.push({
                            name: name,
                            text: text,
                            timestamp: Firebase.ServerValue.TIMESTAMP
                         });
                $('#messageInput').val('');
                $('#nameInput').val('');

                swal("Спасибо за отзыв!", "Ваше мнение важно для нас", "success"); //sweet alert
                $('#exampleModal').modal('hide'); //close modal
            }

            else {
                alert("Enter name and msg!");
            }

        }


        // Add a callback that is triggered for each chat message.
        //msg.on('child_added', function (snapshot) {
        //    var message = snapshot.val();
        //    $('<div/>').text(message.text).prepend($('<em/>').text(message.name+': ')).appendTo($('#messagesDiv'));
        //    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        //});

        function setError(msg) {
            var id = ++errId;
            $('body').append('<p id="err' + id + '">' + msg + '</p>');
            setTimeout(function () {
                $('#err' + id).fadeOut();
            }, 2500);
        }
    }
);




