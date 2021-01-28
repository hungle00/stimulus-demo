import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["option", "branch", "commits"]

  connect() {
    this.optionTargets.forEach(el => {
      if(el.checked) {
        this.loadBranch(el.value)
      }
    });
  }

  selectBranch(event) {
    this.loadBranch(event.srcElement.value)
  }

  loadBranch(branch) {
    this.branchTarget.innerHTML = branch;
    this.commitsTarget.innerHTML = `<li>Loading comits for ${branch}</li>`
    var commitHTML = "";
    fetch(`${this.data.get("url")}${branch}`)
    .then(data => {
      return data.json(); 
    }).then(commits => { 
      var commitsHTML = "";
      commits.forEach((commitJSON) => {
        commitsHTML += commitTemplate(commitJSON);
      }); 
      this.commitsTarget.innerHTML = commitsHTML;
    });
  } 
}

function commitTemplate(commit) {
  return ` <li>
      <a href="${commit.url }" target="_blank" class="commit">${ commit.sha.slice(0, 7) }</a>
      - <span class="message">${ truncate(commit.commit.message) }</span><br>
      by <span class="author"><a :href="record.author.html_url" target="_blank">${ commit.commit.author.name }</a></span>
      at <span class="date">${ formatDate( commit.commit.author.date ) }</span>
    </li>`;
}

function truncate (v) {
  var newline = v.indexOf('\n')
  return newline > 0 ? v.slice(0, newline) : v
}
  
function formatDate(v) {
  return v.replace(/T|Z/g, ' ')
}