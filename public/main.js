const socket = io();

socket.on('products', data => {
    render(data);
})

socket.on('edit-product-event', data => {

    document.getElementById("id_prod").value = data.id
    document.getElementById("nombre").value = data.nombre
    document.getElementById("codigo").value = data.codigo
    document.getElementById("descripcion").value = data.descripcion
    document.getElementById("precio").value = data.precio
    document.getElementById("stock").value = data.stock
    //document.getElementById("foto").value = data.foto
    const date = new Date(data.timestamp)
    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
    document.getElementById("date").value = formatDate;
})

function deleteProduct(id) {

    socket.emit('delete-product', id);
    return false;
}

function editProduct(id) {

    socket.emit('edit-product', id);
    return false;
}

function newProduct() {
    document.getElementById("product_form").reset();
    document.getElementById("nombre").focus();
    return false;
}

function saveProduct() {
    const id = document.getElementById("id_prod").value;

    const prod = {
        nombre: document.getElementById("nombre").value,
        codigo: document.getElementById("codigo").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        foto: document.getElementById("foto").value,
        timestamp: new Date(document.getElementById("date").value)
    }
   
    socket.emit('save-product', id, prod);

    return false;
}

function render(data) {
    const html = data.map((item, index) => {

        return (`<tr>
        <td>${item.id}</td>
        <td><img src="${item.foto}" alt="" width="50" height="50"></td>
        <td>${item.nombre}</td>
        <td>${item.descripcion}</td>
        <td>${item.codigo}</td>
        <td>$${item.precio}</td>
        <td>${item.stock}</td>
        <td>${item.timestamp}</td>
        <td>
            <a href="javascript:void(0)"><i class="bi bi-trash" onclick="deleteProduct(${item.id})"></i></a>
        </td>
         <td>
            <a href="javascript:void(0)"><i class="bi bi-pencil" onclick="editProduct(${item.id})"></i></a>
        </td>
    </tr>`)
    }).join(" ");

    var tbodyRef = document.getElementById('products').getElementsByTagName('tbody')[0];
    tbodyRef.innerHTML = html;
}
