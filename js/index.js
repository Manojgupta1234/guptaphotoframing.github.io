function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#img').attr('src', e.target.result);
      $('#img').css("display", "inline-block");
      $('.choose_file').css("display","none");
      $("#close_icon").css("display", "inline-block");
      $('.background-image').css('display', 'block').css('background-image', '');

      //maintaining height and width ratio
        setTimeout(function(){
            var imgRef = document.getElementById('img');

            var height = imgRef.naturalHeight;
            var width = imgRef.naturalWidth;
            if(height>500 || width>500){
                var widthratio = width/height;
                var heightratio = height/width;
                  
                imgRef.style.width = widthratio*300;
                imgRef.style.height = imgRef.height;
                imgRef.style.marginLeft = -imgRef.width/2;
                imgRef.style.marginTop = -imgRef.height/2;


             $('.uploaded_image').css("border", "1px solid gray");   
             $('.uploaded_image').css("object-fit", "contain");
            }      
        });
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

function removeImage(){
    $('#img').css("display", "none");
    $('.choose_file').css("display","block");
    $("#close_icon").css("display", "none");
    $('.uploaded_image').css("border", "none");
    $('.background-image').css('display', 'none');
    $('.topFrame').css('display', 'none');
    $('.bottomFrame').css('display', 'none');
    $('.leftFrame').css('display', 'none');
    $('.rightFrame').css('display', 'none');
}

function frameInches(e){
    $('.frameInches .inches span').css("background", "#fff");
    $('.frameInches .inches span').css("color", "#000");
    $(e).css("color", "#fff");
    $(e).css("background", "red");
    loadFramePerInches(e);
}

function loadFramePerInches(size){
    var mainFrame = $("<div></div>").attr("class","main-frame");
    $.each(frames,function(index,frame){
        var image = $("<img></img>").attr("class", "frame-img").attr("src", frame.img).attr("data-frame", index).attr('frame-name', frame.img);
        mainFrame.append(image);      
    }); 
    $(".frameImages").html(mainFrame);
    $('.frame-img').css('display', "none");
    $('.frame-img:first').css('display', "block");
}
var frameNo;

function openMountPopup(){
    $( "#mountPopup" ).css("display", "block");
    $( ".close-mount" ).css("display", "block");
    $('.left-container').css('opacity', '0.3');
    $('.right-container').css('opacity', '0.3');

    var mountImage = $("<div></div>").attr("class","mount-image-container");
    $.each(mounts,function(index,mount){
        var image = $("<img></img>").attr("class", "mount-img").attr("src", mount.img).attr("data-mount", mount.img.substring(mount.img.lastIndexOf('.'), mount.img.lastIndexOf('/')+1));
        mountImage.append(image);      
    }); 
    $(".mount-images").html(mountImage);
    $('.mount-img').bind('click', onMountClick);  
}

function openFramePopup(){
    $( "#framePopup" ).css("display", "block");
    $( ".close-frame" ).css("display", "block");
    $('.left-container').css('opacity', '0.3');
    $('.right-container').css('opacity', '0.3');

    var frameImage = $("<div></div>").attr("class","frame-image-container");
    $.each(frames,function(index,frame){
        var image = $("<img></img>").attr("class", "frame-img").attr("src", frame.img).attr("data-frame", index).attr('frame-name', frame.img);
        frameImage.append(image);      
    }); 
    $(".frame-images").html(frameImage);
    $('.frame-img').bind('click', onframeClick);
      
}

function onMountClick(key){
    var selectedMount = $(key.target).attr('data-mount');
    $('#mountPopup').css('display', 'none');
    $('.left-container').css('opacity', '1');
    $('.right-container').css('opacity', '1');
    $('.mount-mash').css('width', '83%').css('float', 'left');
    $('.selectedMountContainer').css('display', 'block');
    $('.selectedMount').css('display', 'block').attr('src', 'image/mounts/'+selectedMount+'.jpg');
}

function onframeClick(key){
    var selectedFrame = $(key.target).attr('data-frame');
    $('#framePopup').css('display', 'none');
    $('.left-container').css('opacity', '1');
    $('.right-container').css('opacity', '1');
    
    var mainFrame = $("<div></div>").attr("class","main-frame");    
    mainFrame.append($(key.target));      
    $(".frameImages").html(mainFrame);
    $('.frame-img').css('display', "none");
    $('.frame-img:first').css('display', "block");
}

function closeMount(){
    $('#mountPopup').css('display', 'none');
    $( ".close-mount").css("display", "none");
    $('.left-container').css('opacity', '1');
    $('.right-container').css('opacity', '1');
}

function closeFrame(){
    $('#framePopup').css('display', 'none');
    $( ".close-frame").css("display", "none");
    $('.left-container').css('opacity', '1');
    $('.right-container').css('opacity', '1');
}

function generateFrame(){
    var tempFrameImage = $('<img></img').attr('id', 'frameIdImage').attr('src', selectedFrameName);
    var frameWidth = tempFrameImage[0].naturalWidth/tempFrameImage[0].naturalHeight*32;

    var imageToBeFrame = $('.background-image #img');
    var height = imageToBeFrame.height();
    var width = imageToBeFrame.width();
    var selectedForBackground = $('.selectedMount');
    $('.background-image').css('height', (height+60) + "px").css('width', (width+60) + "px")
            .css('margin-top', -((height+60)/2))
            .css('margin-bottom', -((height+60)/2))
            .css('margin-left', -((width+60)/2))
            .css('margin-right', -((width+60)/2))
            .css('background-image', "url("+$('.selectedMount')[0].src.substring($('.selectedMount')[0].src.indexOf('image'))+")");         

    // Uncomment for BORDER        
    $('.topFrame').css('display', 'block').css('width', width+120);
    $('.bottomFrame').css('display', 'block').css('width', width+120);
    $('.leftFrame').css('display', 'block').css('width', height+120)
        .offset({left: $('.background-image').offset().left - 31});
    $('.rightFrame').css('display', 'block').css('width', height+120)
        .offset({left: $('.background-image').offset().left + $('.background-image').width() -1});


    //Comment for BORDER
    // $('.topFrame').css('display', 'block').css('width', width+60);
    // $('.bottomFrame').css('display', 'block').css('width', width+60);
    // $('.leftFrame').css('display', 'block').css('width', height+60)
    //     .offset({left: $('.background-image').offset().left});
    // $('.rightFrame').css('display', 'block').css('width', height+60)
    //     .offset({left: ($('.background-image').offset().left + $('.background-image').width() -1)-(width+60)/2 + width/2});
    // $('.topFrame').css('left', 0).css('top', 0);
    // $('.bottomFrame').css('left', 0).css('top', '82.5%');    


    $('.leftFrame').css('background-image', 'url('+selectedFrameName+ ')')
            .css('background-size', frameWidth +"px");
    $('.rightFrame').css('background-image', 'url('+selectedFrameName+ ')')
            .css('background-size', frameWidth +"px");
    $('.topFrame').css('background-image', 'url('+selectedFrameName+ ')')
            .css('background-size', frameWidth +"px");
    $('.bottomFrame').css('background-image', 'url('+selectedFrameName+ ')')
            .css('background-size', frameWidth +"px");
        
    $('#actual-frame-container').css('height', Number($('.background-image').css('height').split('px')[0])+100 +'px');
    $('#actual-frame-container').css('width', Number($('.background-image').css('width').split('px')[0])+100 + 'px');
}

$(document).ready(function(){
    $("#frameSelect").bind("click", function(){
        if($("#frameSelect > .frame").css("display") !== "block"){
            $('.frame').css("display", "block");
            $('#default-frame').css('border-bottom', "1px solid gray");
        }else{
            $('.frame').css("display", "none");
            $('#default-frame .frame').css("display", "block");   
            $('#default-frame .frame').css('border', "none");
        }
    }); 
    $('.frame').bind('click', function(key){
        $('#default-frame').html($(key.target.outerHTML));
        $('#default-frame').attr("value", $(key.target.outerHTML).attr("value"));
    });

    $('.frameImages').bind('click', function(key){
        $('.frame-img').addClass('selected');
        selectedFrameName = $(key.target).attr('frame-name');
    }); 

    frames = [], mounts = [];
    $.ajax({
      url: "image/frames/imagecount.txt",
      success: function(data){
         for(var i=1; i<=Number(data); i++){
            frames.push({'img':'image/frames/'+i+'.png'});
            };
        }
    });

    $.ajax({
      url: "image/mounts/imagecount.txt",
      success: function(data){
         for(var i=1; i<=Number(data); i++){
            mounts.push({'img':'image/mounts/'+i+'.jpg'});
            };
        }
    });

});