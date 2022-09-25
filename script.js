let main=document.createElement("div");
main.setAttribute("class","main");

let row=document.createElement("div");
row.setAttribute("class","row");
row.setAttribute("id","contentRow");

let col=document.createElement("div");
col.setAttribute("class","col-lg-6");

let h1=tagAttrCont("h1","id","title","Pagination");

let description=tagAttrCont("p","id","description","This is pagination task");

let div=document.createElement("div");
div.setAttribute("class","table-responsive");
div.setAttribute("id","table");

let table=document.createElement("table");
table.classList.add("table","table-bordered");

let thead=document.createElement("thead");
thead.classList.add("thead-dark");

let tr=document.createElement("tr");

let th1=document.createElement("th");
th1.innerHTML="ID";
let th2=document.createElement("th");
th2.innerHTML="Name";
let th3=document.createElement("th");
th3.innerHTML="E-mail";

let tbody=document.createElement("tbody");
tbody.setAttribute("id","tbody");

let pagination=document.createElement("div");
pagination.setAttribute("id","buttons");
pagination.classList.add("d-flex","justify-content-center");

tr.append(th1,th2,th3);
thead.append(tr);
table.append(thead,tbody);
div.append(table);
col.append(h1,description,div,pagination);
row.append(col);
main.append(row);
document.body.append(main);

function tagAttrCont(tagname,attrname,attrvalue,content){
    let ele=document.createElement(tagname);
    ele.setAttribute(attrname,attrvalue);
    ele.innerHTML=content;
    return ele;
}

function createTableRow(id,name,email){
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td1.innerHTML = id
    td2.innerHTML = name
    td3.innerHTML = email
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tbody.append(tr)
}

const xhr=new XMLHttpRequest();
xhr.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
xhr.send();
xhr.onload=function (){
    const tableData=JSON.parse(xhr.response);
    var state = {
        querySet: tableData,
        page: 1,
        rows: 10,
        window: 5
    };
       
    buildTable();
       
    function pagination(querySet, page, rows) {
        var trimStart = (page - 1) * rows;
        var trimEnd = trimStart + rows;
       
        var trimmedData = querySet.slice(trimStart, trimEnd);
       
        var pages = Math.round(querySet.length / rows);
       
        return {
          querySet: trimmedData,
          pages: pages
        };
    }
       
    function pageButtons(pages) {
        var wrapper = document.getElementById('buttons');
       
        wrapper.innerHTML = ``;
       
        var maxLeft = state.page - Math.floor(state.window / 2);
        var maxRight = state.page + Math.floor(state.window / 2);
       
        if (maxLeft < 1) {
          maxLeft = 1;
          maxRight = state.window;
        }
       
        if (maxRight > pages) {
          maxLeft = pages - (state.window - 1);
       
          if (maxLeft < 1) {
            maxLeft = 1;
          }
          maxRight = pages;
        }
       
        for (var page = maxLeft; page <= maxRight; page++) {
          wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-outline-dark mx-2 px-3">${page}</button>`;
        }
        wrapper.innerHTML = `<button value=${-1} class="move btn btn-sm btn-outline-secondary px-3 mx-2">&#171; Previous</button>` + wrapper.innerHTML;
        if (state.page !== 1) {
          wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-outline-success px-3 mx-2">&#171; First</button>` + wrapper.innerHTML;
        }
        wrapper.innerHTML += `<button value=${1} class="move btn btn-sm btn-outline-secondary px-3 mx-2">next &#187;</button>`;
        if (state.page !== pages) {
          wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-outline-success mx-2">Last &#187;</button>`;
        }
        $('.page').on('click', function () {
          $('#tbody').empty();
       
          state.page = Number($(this).val());
       
          buildTable();
        });
        $('.move').on('click', function () {
          $('#tbody').empty();
          state.page += Number($(this).val());
          if (state.page > 20) state.page = 1;
          else if (state.page < 1) state.page = 20;
          buildTable();
        });
    }

    function buildTable() {
        let table = $('#tbody');
        let data = pagination(state.querySet, state.page, state.rows);
        let myList = data.querySet;
       
        for (let i in myList) {
          let row = `<tr>
                        <td>${myList[i].id}</td>
                        <td>${myList[i].name}</td>
                        <td>${myList[i].email}</td>
                        `;
          table.append(row);
        }
        pageButtons(data.pages);
    }
}