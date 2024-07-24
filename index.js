document.querySelector(".fileinput").addEventListener('change', function(e) {
    let files = e.target.files;
    let previewer = document.querySelector('.previewer');

    Array.from(files).forEach(file => {
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            let url = URL.createObjectURL(file);
            let mediadiv = document.createElement('div');
            mediadiv.className="col-4 divfix";
            
            if(file.type.startsWith('image/')){
             let img=document.createElement('img');
             img.src=url;
             img.style.display='block';
             mediadiv.appendChild(img);
             previewer.appendChild(mediadiv);
            }
            else if(file.type.startsWith('video/')){
             let video=document.createElement('video');
             video.src=url;
             video.style.display='block';
             video.className="video";
             video.autoplay="true";
             video.loop="true";
            mediadiv.appendChild(video);
            previewer.appendChild(mediadiv);
            }

            let downloadlink = document.createElement("a");
            downloadlink.download = file.name;
            downloadlink.href = url;
            downloadlink.className = 'fas fa-download download';
            downloadlink.style.display = 'inline-block';
            downloadlink.style.marginBottom = '20px';
            mediadiv.appendChild(downloadlink);


            mediadiv.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                let contextMenu = document.getElementById('contextMenu');
                contextMenu.style.display = 'block';
                contextMenu.style.left = `${event.pageX}px`;
                contextMenu.style.top = `${event.pageY}px`;
                contextMenu.dataset.targetId = mediadiv.dataset.id = `mediadiv-${Date.now()}`;
            });
            mediadiv.addEventListener('click', function(event) {
                if (event.target !== downloadlink) {
                    let modal = document.getElementById("myModal");
                    let modalContent = modal.querySelector('.modal-content');
                    modalContent.innerHTML = ''; 
            
                    let clonedMediaElement;
                    if (file.type.startsWith('image/')) {
                        clonedMediaElement = document.createElement('img');
                    } else if (file.type.startsWith('video/')) {
                        clonedMediaElement = document.createElement('video');
                        clonedMediaElement.autoplay = true;
                        clonedMediaElement.loop = true;
                    }
                    clonedMediaElement.src = url;
                    clonedMediaElement.style.width = '100%';
                    clonedMediaElement.style.height = '100%';
                    modalContent.appendChild(clonedMediaElement);
            
                    modal.style.display = "flex";
                }
            });
            // setTimeout(function() {
            //     URL.revokeObjectURL(url);
            // }, 5000);
        } else {
            alert("Sekil elave et");
        }
    });
});

document.getElementById('delete').addEventListener('click', function() {
    let contextMenu = document.getElementById('contextMenu');
    let targetId = contextMenu.dataset.targetId;
    let targetDiv = document.querySelector(`[data-id='${targetId}']`);
    if (targetDiv) {
        let confirmDelete = confirm('mediani silmek isdeyirsiniz?');
        if (confirmDelete) {
            targetDiv.remove();
        }
    }
    contextMenu.style.display = 'none';
});

document.addEventListener('click', function(event) {
    let contextMenu = document.getElementById('contextMenu');
    if (!contextMenu.contains(event.target)) {
        contextMenu.style.display = 'none';
    }
});
let modal = document.getElementById("myModal");
let closeBtn = modal.querySelector('.close');
closeBtn.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
