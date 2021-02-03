var path = require('path')
const fs = require("fs");
const https = require('https');

const base = "./docs/chapters"

var SideBar_Template = ""

const main = () => {

  SideBar_Template += "<!-- AUTOMATIC SIDEBAR GENERATED -->\n"

  fs.readdirSync(base).forEach(chapter => {

    chapterformat = "- " + chapter.slice(3, chapter.length).replace(/-/g, " ") + "\n\n"
    SideBar_Template += chapterformat

    fs.readdirSync(base + "/" + chapter).forEach(list => {

      listformat = "  - <span>" + list.slice(3, list.length).replace(/-/g, " ") + "</span>" + "\n"
      SideBar_Template += listformat

      fs.readdirSync(base + "/" + chapter + "/" + list).forEach(file => {

        fileformat = "      - [" + file.replace(/-/g, " ").replace(/.md/g, "") + "](/chapters/" + chapter + "/" + list + "/" + file + ")" + "\n"
        SideBar_Template += fileformat

        let CommitFile = fs.readFileSync(base + "/" + chapter + "/" + list + "/" + file).toString('utf-8')

        if (CommitFile.length > 0) {
          const index = CommitFile.search("This page was last updated");

          const start = index + 30

          const end = index + 59

          var options = {
            host: 'api.github.com',
            path: "/repos/UmarGit/umargit/commits?path=chapters" + "/" + chapter + "/" + list + "/" + file + "&page=1&per_page=1",
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
          };
          console.log(options);

          const api = https.get(options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              var date = new Date(JSON.parse(data)[0]['commit']['committer']['date']).toGMTString()
              console.log(date);
            });

          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });

          console.log(CommitFile.slice(start, end));

        }
      })
    })
  })
}

main()
