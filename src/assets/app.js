/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var inputTarget = wrapper.getAttribute("data-target");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
    // It's Necessary to use an opaque color when saving image as JPEG;
    // this option can be omitted if only saving as PNG or SVG
    backgroundColor: 'rgb(255, 255, 255)',
    onEnd: function () {
        var dataURL = signaturePad.toDataURL();
        //inputTarget.set("value", dataURL);
        $(inputTarget).val(dataURL);
        //console.log(inputTarget);
    }
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);

    // This part causes the canvas to be cleared
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);

    // This library does not listen for canvas changes, so after the canvas is automatically
    // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
    // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
    // that the state of this library is consistent with visual state of the canvas, you
    // have to clear it manually.
    signaturePad.clear();
    $(inputTarget).val("");
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
// window.onresize = resizeCanvas;
resizeCanvas();


// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}

if (clearButton !== null)
    clearButton.addEventListener("click", function (event) {
        signaturePad.clear();
        $(inputTarget).val("");
    });

if (undoButton !== null)
    undoButton.addEventListener("click", function (event) {
        var data = signaturePad.toData();

        if (data) {
            data.pop(); // remove the last dot or line
            signaturePad.fromData(data);
            if (signaturePad.isEmpty()) {
                $(inputTarget).val("");
            } else {
                $(inputTarget).val(signaturePad.toDataURL());
            }

        }
    });


function appendDataTo(target) {
    if (signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
    } else {
        var dataURL = signaturePad.toDataURL();
        //sendToUrl(dataURL,url);
        $(target).val(dataURL);
    }
}
