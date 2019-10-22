$(() => {
  let workoutArray = [];
  let setArray = [];
  let repsArray = [];

  //Fetching w/ promises//
  const generateData = () => {
    $(".choice").on("click", ".inner", function() {
      let grab = $(this).attr("id");
      fetch(`https://flaskapp.dmbernaal.now.sh/workout/${grab}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          workoutArray = [];
          setArray = [];
          repsArray = [];
          for (i in data.workouts) {
            let workout = data.workouts[i].exercise;
            let set = data.workouts[i].set;
            let reps = data.workouts[i].reps;
            workoutArray.push(workout);
            setArray.push(set);
            repsArray.push(reps);
          }
        })
        .then(() => {
          let ldata = workoutArray.length;
          generateTable(ldata);
        })
        .catch(err => console.log(err));
    });
  };
  const generateTable = lendata => {
    console.log(lendata);
    if (screen.width > 800 && lendata > 8) {
      lendata = 8;
    } else if (screen.width < 800 && lendata > 6) {
      lendata = 6;
    }
    for (i = 0; i < lendata; i++) {
      console.log(lendata);
      $table = $('<div class ="table">').attr("id", `table${i}`);
      $("#first-grid").append($table);
      $header = $('<h3 class = "headerTitle">')
        .attr("id", `header${i}`)
        .text(`${workoutArray[i]}`);
      $table.append($header);
      $set = $('<h4 class = "setTitle">')
        .attr("id", `set${i}`)
        .text(`set: ${setArray[i]}`);
      $header.append($set);
      $reps = $('<h5 class = "repsTitle">')
        .attr("id", `reps${i}`)
        .text(`reps: ${repsArray[i]}`);
      $set.append($reps);
    }
  };

  const start = () => {
    generateData();
  };
  start();
});
