var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var img = new Image();
var fileName = '';

var downloadBtn = document.getElementById('download-btn');
var uploadFile = document.getElementById('upload-file');
var revertBtn = document.getElementById('revert-btn');


uploadFile.addEventListener('change', function(e){
    var file = document.getElementById('upload-file').files[0];

    // File Reader API
    var reader = new FileReader();

    if(file){
        fileName = file.name;

        reader.readAsDataURL(file)
    }

    // add image to canvas
    reader.addEventListener('load', function(){
        img.src = reader.result;
        
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        }
    },false);

});


// Filters and Effects using event delegation.
document.addEventListener('click', function(e){
    if(e.target.classList.contains('filter-btn')) {
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas', img, function(){
                this.brightness(5).render();
            });
        } else if(e.target.classList.contains('brightness-remove')){
            Caman('#canvas',  img, function(){
                this.brightness(-5).render();
            });
        } else if(e.target.classList.contains('contrast-add')){
            Caman('#canvas', img, function(){
                this.contrast(+5).render();
            });
        } else if(e.target.classList.contains('contrast-remove')){
            Caman('#canvas', img, function(){
                this.contrast(-5).render();
            });
        } else if(e.target.classList.contains('saturation-add')){
            Caman('#canvas', img, function(){
                this.saturation(5).render();
            });
        } else if(e.target.classList.contains('saturation-remove')){
            Caman('#canvas', img, function(){
                this.saturation(-5).render();
            });
        } else if(e.target.classList.contains('vibrance-add')){
            Caman('#canvas', img, function(){
                this.vibrance(5).render();
            });
        } else if(e.target.classList.contains('vibrance-remove')){
            Caman('#canvas', img, function(){
                this.vibrance(-5).render();
            });
        } else if(e.target.classList.contains('vintage-add')){
            Caman('#canvas', img, function(){
                this.vibrance().render();
            });
        } else if(e.target.classList.contains('lomo-add')){
            Caman('#canvas', img, function(){
                this.lomo().render();
            });
        } else if(e.target.classList.contains('clarity-add')){
            Caman('#canvas', img, function(){
                this.clarity().render();
            });
        } else if(e.target.classList.contains('sincity-add')){
            Caman('#canvas', img, function(){
                this.sinCity().render();
            });
        } else if(e.target.classList.contains('crossprocess-add')){
            Caman('#canvas', img, function(){
                this.crossProcess().render();
            });
        } else if(e.target.classList.contains('pinhole-add')){
            Caman('#canvas', img, function(){
                this.pinhole().render();
            });
        } else if(e.target.classList.contains('nostalgia-add')){
            Caman('#canvas', img, function(){
                this.nostalgia().render();
            });
        } else if(e.target.classList.contains('hermajesty-add')){
            Caman('#canvas', img, function(){
                this.herMajesty().render();
            });
        }
    }
});

// Revert to previous state
revertBtn.addEventListener('click', function(){
    Caman('#canvas', img, function(){
        this.revert();
    });
});

// Download image
downloadBtn.addEventListener('click', function(){
    var fileExtension = fileName.slice(-4);

    // New filename
    var newFilename;

    if (fileExtension == '.jpg' || fileExtension == '.png') {
        newFilename = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
    }
    download(canvas, newFilename);

});

function download(canvas, filename){
    var e;
    var link = document.createElement('a');

    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.8);

    e = new MouseEvent('click');

    link.dispatchEvent(e);
}