document.addEventListener('DOMContentLoaded', function() {
    jQuery(function($){
    // $('body').attr('data-barba', 'wrapper');


        // $('figure#back').on('click', function(e){
        //     e.preventDefault();
        //     window.history.back();
        // });
  
    var mywindow = $(window);
    var mypos = mywindow.scrollTop();

    mywindow.scroll(function() {
    if (mypos > 10) {
        if(mywindow.scrollTop() > mypos) {
            $('header.wp-block-template-part').addClass('headerup');
            $('header.wp-block-template-part').removeClass('fullheader');
            // $('.single-products .apertura').removeClass('fixed');
        } else {
            $('header.wp-block-template-part').removeClass('headerup');
            $('header.wp-block-template-part').addClass('fullheader');
            // $('.single-products .apertura').addClass('fixed');      
        } if (mypos = 0) {
            $('header.wp-block-template-part').removeClass('fullheader');
            }
        }
        mypos = mywindow.scrollTop();
        });

        $('#btn-open').click(function (e) {
            if ($('.menu-nav or body or #btn-close').hasClass("active")) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
            }
            else {
                $('.menu-nav').addClass("active");
                $('body').addClass("active");
                $('#btn-close').addClass("active");
            }
        });

        $('#btn-close').click(function (e) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
        });

    });    
});

document.addEventListener("DOMContentLoaded", function () {

    function cloneHeaders() {
      // Remove any existing cloned headers to avoid duplicates.
      document.querySelectorAll(".mobile-column-header").forEach(function(header) {
        header.remove();
      });
      
      if (window.innerWidth <= 780) {
        // Get header cells from the thead row
        const headerCells = document.querySelectorAll(".tsl-table table thead tr th");
        
        // For each row in tbody, insert a cloned header cell before each td
        document.querySelectorAll(".tsl-table table tbody tr").forEach((row) => {
          headerCells.forEach((headerCell, index) => {
            // Create a new element to hold the header content
            const headerClone = document.createElement("div");
            headerClone.className = "mobile-column-header";
            headerClone.innerHTML = headerCell.innerHTML;
            
            // Find the corresponding td in the row
            const cell = row.querySelectorAll("td")[index];
            if (cell) {
              // Insert the cloned header at the beginning of the cell
              cell.insertBefore(headerClone, cell.firstChild);
            }
          });
        });
      }
    }
    
    // Initial clone on DOM load
    cloneHeaders();
    
    // Re-run on window resize to add/remove clones as needed
    window.addEventListener("resize", cloneHeaders);
  });
  
  
/* POP UP */
window.addEventListener("load", () => {
    // Using querySelector to select single elements.
    const button = document.querySelector(".click");
    const close = document.querySelector(".close");
    const body = document.querySelector("body");
    const hide = document.getElementById("wpforms-5359-field_18");
  
    // Only add the event if the "close" button exists.
    if (close && body) {
        close.addEventListener("click", (event) => {
            event.preventDefault();
            body.classList.remove("show");
        });
    }
  
    // Only add the event if the "button" exists.
    if (button && body) {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            // If you need to retrieve a link's href inside the button:
            const link = button.querySelector("a");
            let href = "";
            if (link) {
                href = link.href;
                console.log("Link href:", href);
            }
            if (hide) {
                hide.value = href;
            }
            body.classList.add("show");
        });
    }
  
    // For multiple elements with the class "tsl-productos"
    const tslProductos = document.querySelectorAll(".tsl-productos");
    tslProductos.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });

 const tslColor = document.querySelectorAll(".gris");
 if(tslColor){
    $(tslColor).click(function (e) {
        $('.colormotor > img').css("filter", "grayscale(1)");
    });
    $('.taronja').click(function (e) {
        $('.colormotor > img').css("filter", "grayscale(0)");
    });
}
});


/* POP UP */

window.addEventListener("load", () => {
    let button = document.querySelector(".clickPager");
    let buttonDonwload = document.querySelector(".clickDonwload");
    let hide = document.getElementById("wpforms-5359-field_18");
    let box = document.querySelector(".download-pager");

    button.addEventListener("click", () => {
        event.preventDefault();
        // var href = button.querySelector('a').href;
        // console.log(href);
        if (hide) {
             hide.value = href;
         }
         body.classList.add("show");
    });

    buttonDonwload.addEventListener("click", () => {
        event.preventDefault();
        box.classList.add("display-box");
    });

    /* NAVEGACIÓ SUBSECCIONS */

    const panel = document.querySelector('[rel="panel"]');

    panel.addEventListener('mouseenter', () => {
    panel.classList.toggle('activo');
    });

    panel.addEventListener('mouseleave', () => {
    panel.classList.toggle('activo');
    });

});