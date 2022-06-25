var FileSubmissionElement = document.getElementById("file-submission");
var DeepFriedOutputElement = document.getElementById("deep-fried-output");
var ConfigSlidersParent = document.getElementById("config-sliders");
var BrightnessSlider = document.getElementById("param-brightness");
var ContrastSlider = document.getElementById("param-contrast");
var SaturationSlider = document.getElementById("param-saturate");
var HueRotateSlider = document.getElementById("param-hue-rotate");
var InvertSlider = document.getElementById("param-invert");
var CanvasFilters;
var CanvasFiltersFormat = "[brightness] [contrast] [saturate] [hue-rotate] [invert]";
function UpdateFilters() {
    CanvasFilters = CanvasFiltersFormat;
    CanvasFilters = CanvasFilters.replace("[brightness]", "brightness(".concat(BrightnessSlider.value, ")"));
    CanvasFilters = CanvasFilters.replace("[contrast]", "contrast(".concat(ContrastSlider.value, ")"));
    CanvasFilters = CanvasFilters.replace("[saturate]", "saturate(".concat(SaturationSlider.value, "%)"));
    CanvasFilters = CanvasFilters.replace("[hue-rotate]", "hue-rotate(".concat(HueRotateSlider.value, "deg)"));
    CanvasFilters = CanvasFilters.replace("[invert]", "invert(".concat(InvertSlider.value, "%)"));
    DeepFriedOutputElement.style.filter = CanvasFilters;
}
function DeepFry(ev) {
    var Input = ev.target;
    var Reader = new FileReader();
    Reader.onload = function () {
        var FileDataURL = Reader.result;
        var Context = DeepFriedOutputElement.getContext("2d");
        var TemporaryImageElement = document.body.appendChild(document.createElement("img"));
        TemporaryImageElement.src = String(FileDataURL);
        TemporaryImageElement.onload = function () {
            DeepFriedOutputElement.width = TemporaryImageElement.width;
            DeepFriedOutputElement.height = TemporaryImageElement.height;
            Context.drawImage(TemporaryImageElement, 0, 0, TemporaryImageElement.width, TemporaryImageElement.height);
            ConfigSlidersParent.style.display = "block";
            TemporaryImageElement.style.display = "none";
            BrightnessSlider.onchange = UpdateFilters;
            ContrastSlider.onchange = UpdateFilters;
            SaturationSlider.onchange = UpdateFilters;
            HueRotateSlider.onchange = UpdateFilters;
            InvertSlider.onchange = UpdateFilters;
        };
    };
    Reader.readAsDataURL(Input.files[0]);
}
