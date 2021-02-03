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

          const end = index + 45

          var options = {
            host: 'api.github.com',
            path: "/repos/UmarGit/docs/commits?path=docs/chapters" + "/" + chapter.replace('$', '%24') + "/" + list.replace('$', '%24') + "/" + file + "&page=1&per_page=1&sha=ed30a9473fa71a6aec9f2618db3989ea55cd7da5",
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
          };

          https.get(options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              var date = new Date(JSON.parse(data)[0]['commit']['committer']['date']).toDateString()
              let UpdateCommitDate = CommitFile.slice(start, end)
              CommitFile = CommitFile.replace(UpdateCommitDate, date);
              fs.writeFileSync(base + "/" + chapter + "/" + list + "/" + file, CommitFile)
            });

          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
        }
      })
    })
  })
}

main()

// fs.writeFileSync("./docs/_sidebar.md", SideBar_Template);