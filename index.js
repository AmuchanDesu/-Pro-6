
var product = [{
    id: 1,
    img: 'https://d1dtruvuor2iuy.cloudfront.net/media/catalog/product/f/2/f2400e16f2027dacf65a96b9f95c3dc444ed1366_mkp0851618dummy_6.jpg',
    name: 'PILOT ปากกาเจลกด 0.7mm.G-2 L',
    price: 55,
    description: 'PILOT shirt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'PILOT',
}, {
    id: 2,
    img: 'https://pim-cdn0.ofm.co.th/products/large/1031411.jpg',
    name: 'ปากกาลูกลื่น 0.5 มม.ดำFaber-Castell1423',
    price: 11,
    description: 'Faber-Castell shirt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Faber-Castell',
}, {
    id: 3,
    img: 'https://pim-cdn0.ofm.co.th/products/large/1006690.jpg',
    name: 'ปากกาลูกลื่น0.5 มม. น้ำเงินด้ามฟ้าสกายบลู UniSX-101FL',
    price: 15,
    description: 'Uni shirt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Uni',
}];

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                  <img class="product-img" src="${product[i].img}" alt="">
                  <p style="font-size: 1.2vw;">${product[i].name}</p>
                  <p stlye="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
    }
    $("#productlist").html(html);
})


function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    //console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                  <img class="product-img" src="${product[i].img}" alt="">
                  <p style="font-size: 1.2vw;">${product[i].name}</p>
                  <p stlye="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
            
        }
        
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
    $("#productlist").html(html);
    }
}

function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal(){
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)
    alert("Succeed");
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                cart.splice(index, 1) 
                console.log(cart)
                rendercart();
                $("#cartcount").css('display','flex').text(cart.length)
                if(cart.length <= 0) {
                    $("#cartcount").css('display','none')
                 }
                   
                
                
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}

function pdfdowload(){
    alert("Thank you very much!!");
}