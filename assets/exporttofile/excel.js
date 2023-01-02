function exportToExcel(tableid,headTitle,filename) {
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';

    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById(tableid); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        if (tab.rows[j].innerHTML.indexOf("Data not found") != -1) {
            return;
        }

        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    //var template = $('#dvTable').html();
    var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    };

    htmls = headTitle

    var ctx = {
        worksheet: 'Worksheet',
        table: htmls
    }


    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = filename;
    link.href = uri + base64(format(tab_text, ctx));
    link.click();
}

function exportToExcelHTML(html, headTitle, filename) {
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';

    var tab_text = html;

    //var template = $('#dvTable').html();
    var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    };

    htmls = headTitle

    var ctx = {
        worksheet: 'Worksheet',
        table: htmls
    }


    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = filename;
    link.href = uri + base64(format(tab_text, ctx));
    link.click();
}