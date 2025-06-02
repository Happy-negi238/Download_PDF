
const textInput = document.getElementById('text-input');
const estimateNumInput = document.getElementById('estimate-input');
const placeInput = document.getElementById('place-input');
const dateInput = document.getElementById('date-input');
const selectInput = document.getElementById('select-input');
const editBtn = document.getElementById('edit-btn');
const downloadLink = document.getElementById('download-link');
const formInput = document.getElementById('formInput');

let currentDate = new Date().toISOString().slice(0, 10)
dateInput.value = currentDate;


let PDF_PATH = "";
let loadedPDF = null;
function selectPdf() {
    PDF_PATH = `../static/allpdf/c${selectInput.value}.pdf`;
    loadPdfFromPath(PDF_PATH);
    // console.log("selectpdf");

    // Automatically load PDF from path

    // async function loadPdfFromPath(path) {
    //   try {
    //     const response = await fetch(path);
    //     if (!response.ok) throw new Error('PDF not found at path: ' + path);
    //     loadedPDF = await response.arrayBuffer();
    //   } catch (err) {
    //     alert("Failed to load PDF: " + err.message);
    //   }
    // }

    // Load it once the page loads
    // window.addEventListener('DOMContentLoaded', async () => {
    //   await loadPdfFromPath(PDF_PATH);
    // });
}

function loadPdfFromPath(path) {
    fetch(path)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("pdf path not found : " + path)
            }
            return response.arrayBuffer();
        })
        .then(function (data) {
            loadedPDF = data;
        })
        .catch(function (err) {
            alert("Failed to load PDF" + err.message)
        })
}

editBtn.addEventListener('click', async () => {
    if (!loadedPDF) {
        alert("PDF not loaded yet.");
        return;
    }

    const userText = textInput.value.trim();
    const estimateNum = estimateNumInput.value.trim();
    const dateText = dateInput.value.trim();
    const placeText = placeInput.value.trim();

    //Add custom Font
    const pdfDoc = await PDFLib.PDFDocument.load(loadedPDF);
    const urlfontSimp = '../static/font/segoeuithis.ttf';
    const urlbold = '../static/font/segoeuibold.ttf';
    const fontBytesbd = await fetch(urlbold).then(res => res.arrayBuffer().catch(err => alert(err + "Font not found")));
    const fontBytesSimp = await fetch(urlfontSimp).then(res => res.arrayBuffer().catch(err => alert(err + "Font not found")));
    pdfDoc.registerFontkit(fontkit);
    // const pdfDoc = await PDFLib.PDFDocument.create();
    const segoeBd = await pdfDoc.embedFont(fontBytesbd);
    const segoeSimp = await pdfDoc.embedFont(fontBytesSimp);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    // console.log("width : ",width);

    // const font = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
    // const textWidth = font.widthOfTextAtSize(userText, 30);

    // User Text Align
    // const centerX = (width - textWidth) / 2;
    const userTextY = height - 193;
    firstPage.drawText(userText, {
        x: 51,
        y: userTextY,
        size: 10,
        font: segoeBd,
        color: PDFLib.rgb(0, 0, 0),
    });

    // Estimate Text Align
    const estimateNumX = width - 56;
    const estimateNumY = height - 192;
    firstPage.drawText(estimateNum, {
        x: estimateNumX,
        y: estimateNumY,
        size: 10,
        font: segoeSimp,
        color: PDFLib.rgb(0, 0, 0),
    })


    // Date Text Align
    const dateTextX = width - 83
    const dateTextY = height - 210;
    firstPage.drawText(dateText, {
        x: dateTextX,
        y: dateTextY,
        size: 10,
        font: segoeSimp,
        color: PDFLib.rgb(0, 0, 0),
    })


    // Place Text Align
    const placeTextX = width - 71;
    const placeTextY = height - 227;
    firstPage.drawText(placeText, {
        x: placeTextX,
        y: placeTextY,
        size: 10,
        font: segoeSimp,
        color: PDFLib.rgb(0, 0, 0),
    })

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.style.display = 'inline-block';
    downloadLink.textContent = 'Download PDF';
});

function validation(inputId, errorId){
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    const value = input.value.trim()
    if (value.length == 0){
        error.removeAttribute('hidden');
        error.textContent = `*${input.name} is required`
        error.style.color = "red"
    }
    else{
        error.setAttribute('hidden','');
    };
};

function checkDetails(){
    if(!textInput.value.length == 0 && !placeInput.value.length == 0 
        && !dateInput.value.length == 0
        && !estimateNumInput.value.length == 0)
    {    
        editBtn.removeAttribute("disabled","");
    }
}
