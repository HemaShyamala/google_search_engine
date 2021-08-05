window.onscroll = function () {
  myFunction();
};

// Get the header
var header = document.getElementById("header");

// Get the offset position of the header
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function searchResult() {
  let search = document.getElementById("search").value;
  getData(search);
}
async function getData(s) {
  let res = await fetch(
    `http://api.serpstack.com/search?access_key=15e31542fa858492668dab709b25de47&query=${s}`
  );
  let data = await res.json();
  console.log(data);
  let result = data.organic_results;
  let knowledge = data.knowledge_graph;
  console.log(knowledge);
  appendData(result, knowledge);
}

let div = document.getElementById("result");

let right_div = document.getElementById("right");

function appendData(left, right) {
  div.innerHTML = null;
  right_div.innerHTML = null;
  left.forEach(({ title, displayed_url, url, snippet }) => {
    let searchDiv = document.createElement("div");
    let displayUrl = document.createElement("p");

    let titleline = document.createElement("a");
    let para = document.createElement("p");

    //  console.log(title, displayed_url, url);

    displayUrl.innerHTML = displayed_url;

    titleline.innerHTML = title;

    para.innerHTML = snippet;
    titleline.setAttribute("id", "title");

    titleline.addEventListener("click", function () {
      window.location.href = url;
    });
    searchDiv.append(displayUrl, titleline, para);
    div.append(searchDiv);
  });
  let { title } = right;
  let { description } = right;
  let {
    source: { url },
  } = right;

  let { website } = right;
  let { founded } = right;
  let { headquarters } = right;
  let { founders } = right;
  let { subsidiaries } = right;
  let { profiles } = right;
  let { people_also_search_for } = right;
  let { image_urls } = right;

  let t_div = document.createElement("p");
  t_div.innerHTML = title;

  let d_div = document.createElement("p");
  d_div.innerHTML = description;

  let wiki = document.createElement("a");
  wiki.innerHTML = "Wikipedia";
  wiki.addEventListener("click", function () {
    window.location.href = url;
  });

  let web_div = document.createElement("p");
  web_div.innerHTML = website;

  let found_div = document.createElement("p");

  found_div.innerHTML = `Founded: ${founded}`;

  let head_div = document.createElement("p");

  head_div.innerHTML = `Headquarters: ${headquarters}`;

  let founder_div = document.createElement("div");

  founder_div.setAttribute("id", "founder");

  founder_div.innerHTML = "Founders:";

  founders.forEach(({ name }) => {
    let para = document.createElement("p");

    para.innerHTML = ` ${name}`;

    founder_div.append(para);
  });

  let s_div = document.createElement("div");

  s_div.setAttribute("id", "subsidiaries");

  s_div.innerHTML = "Subsidiaries";
  subsidiaries.forEach(({ name }) => {
    let para = document.createElement("p");
    para.innerHTML = ` ${name}`;
    s_div.append(para);
  });

  let p_div = document.createElement("div");

  p_div.setAttribute("id", "profiles");

  p_div.innerHTML = "Profiles:";
  profiles.forEach(({ name, url }) => {
    let para = document.createElement("p");
    para.innerHTML = `${name}`;
    para.addEventListener("click", function () {
      window.location.href = url;
    });
    p_div.append(para);
  });

  let search_div = document.createElement("div");

  search_div.setAttribute("id", "people");

  search_div.innerHTML = "People also search for <br>";
  people_also_search_for.forEach(({ name, url }) => {
    let para = document.createElement("div");
    para.innerHTML = name;
    para.addEventListener("click", function () {
      window.location.href = url;
    });
    search_div.append(para);
  });

  let img = document.createElement("img");
  img.innerHTML = image_urls[0];

  console.log(
    title,
    description,
    url,
    website,
    founded,
    headquarters,
    founders,
    subsidiaries,
    profiles,
    people_also_search_for,
    image_urls
  );

  right_div.append(
    t_div,
    img,
    d_div,
    web_div,
    found_div,
    head_div,
    founder_div,
    s_div,
    p_div,
    search_div
  );
}
