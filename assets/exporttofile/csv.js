function exportTableToCSV(csv, fileName) {
    var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isMac) {
        var BOM = "\ufeff";
        csv = BOM + csv;
    }

    var blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    }
    else {

        if (isSafari) {
            alert("Tell Joe that he thinks this is safari.");
            window.open('data:attachment/csv;charset=utf-8,' + encodeURI(csv));
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, {
                encoding: "UTF-8",
                type: "text/csv;charset=UTF-8"
            });
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}