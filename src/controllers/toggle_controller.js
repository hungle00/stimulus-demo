import {Controller} from "stimulus"

export default class extends Controller {

  static targets = [ "content" ]

  toggle() {
    this.contentTargets.forEach(el => el.classList.toggle("hover"));
  }   
}