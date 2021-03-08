import {Controller} from "stimulus"

export default class extends Controller {
  static targets = ["modal"]

  initialize() {
    console.log(this.modalTarget)
  }

  launchDemo() {
    let modalController = this.application.getControllerForElementAndIdentifier(
      this.modalTarget,
      "modal"
    );
    modalController.open()
    //this.modalTarget.open();
  }
}