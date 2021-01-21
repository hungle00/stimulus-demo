import {Controller} from "stimulus"

export default class extends Controller {

  static targets = [ "option", "input", "submit" ]

  selectOption(event) {
    console.log(this.optionTargets)
    this.optionTargets.forEach(element => {
      element.classList.toggle("active", event.target == element);
      this.inputTarget.value = event.target.innerText;
      this.submitTarget.disabled = false
    });
  }
}