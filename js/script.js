import Student from "./Student.js";

(() => {
  callFetch();

  //fetching data from JSON API
  function callFetch() {
    let fetchedData = document.querySelector("[data-js-fetched]"),
      url = "https://api.hatchways.io/assessment/students";

    let myRequest = new Request(url);

    fetch(myRequest)
      .then((response) => response.json())
      .then(function (data) {
        let students = data.students;

        //create div for each student
        students.forEach((stud) => {
          fetchedData.insertAdjacentHTML(
            "beforeend",
            `<div class='student' data-js-student ></div>`
          );
          let element = fetchedData.lastElementChild;
          //student behaviour
          new Student(element, stud);
        });
      })
      .catch((error) => {
        console.log(`Fetch error at: ${error.message}`);
      });
  }

  //=============Filters====================
  let filterText = document.querySelector("form").filterText,
    filterTag = document.querySelector("form").filterTag;
  //add lister on name input
  filterText.addEventListener("keyup", () => {
    //call filter function
    filterName();
  });
  //add lister on tag input
  filterTag.addEventListener("keyup", (e) => {
    //call filter function
    filterName();
  });

  /**
   * filter the list of students by their name
   * source: https://www.w3schools.com/howto/howto_js_filter_lists.asp
   */
  function filterName() {
    // Declare variables
    let allStudents, nameFilter, a, txtValue;
    allStudents = document.querySelectorAll("[data-js-student]");
    nameFilter = filterText.value.toUpperCase();
    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < allStudents.length; i++) {
      a = allStudents[i].querySelector("span");
      txtValue = a.textContent || a.innerText;
      txtValue = txtValue.toUpperCase();
      if (txtValue.indexOf(nameFilter) > -1) {
        allStudents[i].classList.remove("hidden");
      } else {
        allStudents[i].classList.add("hidden");
      }
    }
    //lower priority filter
    filterTagName();
  }
  /**
   * filter the list of students by their tags
   */
  function filterTagName() {
    // Declare variables
    let allStudents, tagFilter, a, txtValue;
    allStudents = document.querySelectorAll("[data-js-student]");
    tagFilter = filterTag.value.toUpperCase();
    // Loop through all displayed list items, and hide those who don't match the search query
    for (let i = 0; i < allStudents.length; i++) {
      a = "";
      allStudents[i]
        .querySelector("[data-js-tags]")
        .childNodes.forEach((tag) => {
          a += tag.innerText;
        });
      txtValue = a.toUpperCase();
      if (!allStudents[i].classList.contains("hidden")) {
        if (txtValue.indexOf(tagFilter) > -1) {
          allStudents[i].classList.remove("hidden");
        } else {
          allStudents[i].classList.add("hidden");
        }
      }
    }
  }
})();
