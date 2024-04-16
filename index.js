const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");


dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQrText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);


const DEFALT_URL = "https://www.youtube.com/@asmrprograming_starkteam";
let colorLight = "#fff",
    colorDark = "#000",
    text = DEFALT_URL,
    size = 300;

function handleDarkColor(e){
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e){
    colorLight = e.target.value;
    generateQRCode();
}

function handleQrText(e){
    const value = e.target.value;
    text = value;
    if (!value){
        text = DEFALT_URL;
    }
    generateQRCode();
}

async function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height:size,
        width:size,
        colorLight,
        colorDark,
    });
    download.href = await resloveDataUrl();
}


async function handleShare(){
    setTimeout(async () => {
        try{
            const base64url = await resloveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title:text,
            });
        } catch (error){
            alert("your browser dosent support sharing");
        }
    }, 100);
}


function handleSize(e){
    size = e.target.value;
    generateQRCode();
}


function resloveDataUrl(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

generateQRCode();