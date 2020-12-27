const container = document.getElementById('containerGrid');
const gridSlider = document.getElementById("gridSizer");
const brushSlider = document.getElementById("brushStrength");
const userColorPicker = document.querySelector('#input-color');
let penStrength = gridSlider.value;
let color = 'grey';
function makeRows(size){
    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-cols', size);
    for(i = 0; i < (size*size); i++){
        let cell = document.createElement("div");
        cell.style.backgroundColor = '#ffffff';
        cell.addEventListener('mouseover', colorGrid);
        container.appendChild(cell).className = "grid-item";
    };
};
function colorGrid(){
    switch(color){
        case 'rainbow':
            this.style.backgroundColor =  `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case 'grey':
            colors =  this.style.backgroundColor.substring(4,this.style.backgroundColor.length-1).split(", ");
            let newColor = 'rgb('
            colors.forEach((color) => {
                newColor += parseInt(color)- penStrength >= 0? `${parseInt(color)-penStrength}, ` : '0, ';}); 
            this.style.backgroundColor = newColor.slice(0, -2) + ')';
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            break;
        case 'colorpicker':
            this.style.backgroundColor = color;
            break;
        default:
            this.style.backgroundColor = color;
            break;
    }
}
function userColorSelection(event) {
    color = event.target.value;
}
function createGrid(){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    makeRows(gridSlider.value);
}
let gridItems = document.querySelectorAll('.grid-item')
const buttons = document.querySelectorAll('button');
buttons.forEach((button)=>{
    button.addEventListener('click', () =>{
        if(button.dataset.function == 'Clear')createGrid();
        if(button.dataset.function == 'Eraser')color = 'eraser';
        if(button.dataset.function == 'Rainbow')color = 'rainbow';
        if(button.dataset.function == 'Grey')color = 'grey';
    })
})
gridSlider.addEventListener('mouseup', createGrid);
brushSlider.oninput = function() {
    penStrength = this.value;
}
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
createGrid();
