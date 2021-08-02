export default class student {
  constructor(element, student) {
    this._el = element;
    this.pic = student.pic;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.company = student.company;
    this.skill = student.skill;
    this.city = student.city;
    this.grades = student.grades;

    this.init();
  }

  init = () => {
    this.createDiv();
    //actions on button click
    this._btn.addEventListener("click", () => {
      this.toggleGrades();
    });
    //actions on add tag
    this._tagInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.addTagName();
      }
    });
  };

  /**
   * create div with student details
   */
  createDiv = () => {
    this._el.insertAdjacentHTML(
      "beforeend",
      ` <button><div></div></button>
          <div class='student-image'>
              <img src="${this.pic}">
          </div>
          <div class='details'>
              <span>${this.firstName} ${this.lastName}</span>
              <ul>
                  <li>${this.email}</li>
                  <li>${this.company}</li>
                  <li>${this.skill}</li>
                  <li>${this.city}</li>
                  <li>${this.getAverage()}%
                      <ul  class='hidden' data-js-grades>
                        <br>
                          ${this.showGrades()}
                      </ul>
                  </li>
              </ul>
              <div data-js-tags ></div>
              <form> <input type="text" name="tagName" placeholder="Add a tag" /></form>
          </div>`
    );
    this._btn = this._el.querySelector("button");
    this._tagList = this._el.querySelector("[data-js-tags]");
    this._tagInput = this._el.querySelector("form").tagName;
  };
  /**
   * Show student grades
   */
  showGrades = () => {
    let list = ``;
    for (let i = 0, l = this.grades.length; i < l; i++) {
      //space in ES6 template strings: \u00A0
      list += `<li>Test ${i + 1}: \u00A0\u00A0 ${this.grades[i]}%</li>`;
    }
    return list;
  };
  /**
   * Calculate student average
   */
  getAverage = () => {
    let average = 0;
    this.grades.forEach((grade) => {
      average += parseInt(grade);
    });
    return average / this.grades.length;
  };
  /**
   * show grades and change button animation
   */
  toggleGrades = () => {
    this._el.querySelector("[data-js-grades]").classList.toggle("hidden");
    this._btn.querySelector("div").classList.toggle("no-vertical");
  };
  /**
   * add tag
   */
  addTagName = () => {
    this._tagList.insertAdjacentHTML(
      "beforeend",
      `<div class='tag'>${this._tagInput.value}</div>`
    );
    this._tagInput.value = "";
  };
}
