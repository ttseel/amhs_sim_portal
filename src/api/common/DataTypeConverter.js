function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        alert(allText);
      }
    }
  };
  rawFile.send(null);
}

readTextFile('file:///Users/js.oh/Desktop/Developers/React/amhs_sim_portal/src/db/FromToTable.txt');

fetch('FromToTable.txt').then(response => response.text());

readTextFile('file:///C:/your/path/to/file.txt');
const tsvToJson = (delimiter_tab_file, header = true) => {
  const t = 1;
  console.log(header);
};
