const FileSubmissionElement: HTMLInputElement = document.getElementById("file-submission") as HTMLInputElement;
const DeepFriedOutputElement: HTMLCanvasElement = document.getElementById("deep-fried-output") as HTMLCanvasElement;
const ConfigSlidersParent: HTMLElement = document.getElementById("config-sliders") as HTMLElement;

const BrightnessSlider: HTMLInputElement = document.getElementById("param-brightness") as HTMLInputElement;
const ContrastSlider: HTMLInputElement = document.getElementById("param-contrast") as HTMLInputElement;
const SaturationSlider: HTMLInputElement = document.getElementById("param-saturate") as HTMLInputElement;
const HueRotateSlider: HTMLInputElement = document.getElementById("param-hue-rotate") as HTMLInputElement;
const InvertSlider: HTMLInputElement = document.getElementById("param-invert") as HTMLInputElement;

var CanvasFilters: string;
const CanvasFiltersFormat: string = "[brightness] [contrast] [saturate] [hue-rotate] [invert]"

function UpdateFilters() {
    CanvasFilters = CanvasFiltersFormat;
    CanvasFilters = CanvasFilters.replace("[brightness]", `brightness(${BrightnessSlider.value})`)
    CanvasFilters = CanvasFilters.replace("[contrast]", `contrast(${ContrastSlider.value})`)
    CanvasFilters = CanvasFilters.replace("[saturate]", `saturate(${SaturationSlider.value}%)`)
    CanvasFilters = CanvasFilters.replace("[hue-rotate]", `hue-rotate(${HueRotateSlider.value}deg)`) 
    CanvasFilters = CanvasFilters.replace("[invert]", `invert(${InvertSlider.value}%)`)

    DeepFriedOutputElement.style.filter = CanvasFilters;
}

function DeepFry(ev) {
    const Input = ev.target;
    const Reader: FileReader = new FileReader();

    Reader.onload = () => {
        const FileDataURL = Reader.result;

        const Context: CanvasRenderingContext2D = DeepFriedOutputElement.getContext("2d") as CanvasRenderingContext2D;

        const TemporaryImageElement: HTMLImageElement = document.body.appendChild(document.createElement("img"));
        TemporaryImageElement.src = String(FileDataURL);

        TemporaryImageElement.onload = () => {
            DeepFriedOutputElement.width = TemporaryImageElement.width;
            DeepFriedOutputElement.height = TemporaryImageElement.height;
            Context.drawImage(TemporaryImageElement, 0, 0, TemporaryImageElement.width, TemporaryImageElement.height)

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
