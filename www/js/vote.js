$(document).ready(function () {

        var fb = new Firebase("https://vote-app.firebaseio.com/");

        // monitors changes and updates UI
        fb.child('counter1').on('value', updateDiv);
        fb.child('counter2').on('value', updateDiv);
        fb.child('counter3').on('value', updateDiv);

        fb.on('value', updatePre);

        // creates a new, incremental record
        $('#inc1').on('click', incId1);
        $('#inc2').on('click', incId2);
        $('#inc3').on('click', incId3);

        function blockButton() {
            //Block button and Set timeout
            $('#inc1').prop("disabled", true);
            $('#inc2').prop("disabled", true);
            $('#inc3').prop("disabled", true);

            setTimeout(function () {
                $('#inc1').prop('disabled', false);
                $('#inc2').prop('disabled', false);
                $('#inc3').prop('disabled', false);

            }, 5000);
        }

        // resets the data
        $('#clear').on('click', function () {
            fb.remove();
        });

        // attempts to create any id you put in
        $('#customButton').on('click', function () {
            addRecord($('#custom').val());
        });

        var errId = 0;
        // creates a new, incremental record
        function incId1() {

            //Sweet Alert
            swal("Спасибо за оценку!", "Ваше мнение важно для нас", "success");

            // increment the counter
            fb.child('counter1').transaction(function (currentValue) {
                return (currentValue || 0) + 1
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

        //second

        function incId2() {
            //Sweet Alert
            swal("Спасибо за оценку!", "Ваше мнение важно для нас", "success");
            // increment the counter
            fb.child('counter2').transaction(function (currentValue) {
                return (currentValue || 0) + 1
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


            // increment the counter
            fb.child('counter3').transaction(function (currentValue) {
                return (currentValue || 0) + 1
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

        // creates new incremental record
        function addRecord(id) {
            setTimeout(function () {
                fb.child('records').child('rec' + id).set('record #' + id, function (err) {
                    err && setError(err);
                });
            });
        }

        function updateDiv(ss) {
            $('#show').text(ss.val() || 0);
            $('#custom').val('rec' + (parseInt(ss.val(), 10) + 1));
        }

        function updatePre(ss) {
            $('#data').text(JSON.stringify(ss.val(), null, 2));
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




