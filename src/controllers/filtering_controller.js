import {Controller} from "stimulus"
export default class extends Controller {

  static targets = [ "filter", "select", "result" ]

  connect() {
    const select = this.selectTarget
    for(let option of select.options) {
      this.addSelectOption(option, this.resultTarget)
    }
    select.style.display = "none";
    this.showOrHideOption();
  }

  showOrHideOption() {
    const search = this.filterTarget.value.toLowerCase()
    for(let link of this.resultTarget.children){
      //console.log(link)
      if (link.innerText.toLowerCase().indexOf(search) >= 0) {
        link.classList.remove("hidden");
      } else {
        link.classList.add("hidden");
      }
    }
  }

  addSelectOption(option, element) {
    //const result = this.resultTarget
    const el = document.createElement("p")
    el.innerText = option.text
    el.data
    element.appendChild(el);
  }
}