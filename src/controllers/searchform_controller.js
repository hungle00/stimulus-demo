import {Controller} from "stimulus"

const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

export default class extends Controller {
  static targets = [ "results", "input" ]

  connect() {
    this.cities = {}
    fetch(url)
      .then(resp => resp.json())
      .then(data => this.cities = data)
      //.then(result => console.log(result)) 
  }

  autocomplete() {
    const searchWord = this.inputTarget.value;
    const results = this.cities
      .filter(el => {
        return (el.city + ", " + el.state)
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      })
      .slice(0, 10);

    this.render(searchWord ? results : [])
  }

  render(results) {
    this.resultsTarget.innerHTML = results.reduce((html, result) => {
      const population = parseInt(result.population, 10).toLocaleString();
      return (html += `<li>${result.city}, ${result.state}
              <span class="population">${population}</span></li>`);
    }, "");
  }
}