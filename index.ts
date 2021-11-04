import express, { Application, Request, Response } from 'express'
import hbs from 'express-handlebars'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './services/product.service'
import http from 'http'
import { Server } from 'socket.io';

const app: Application = express()
const server = http.createServer(app);
const io = new Server(server);

let session_products:any = [];

const PORT = 3000
io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('delete-product', async (id) =>{
                        
        const response = await deleteProduct(id)                
        session_products = session_products.filter( (product:any) => product.id != id); 

        console.log(session_products);
        
        io.sockets.emit('products', session_products)
    })

    socket.on('edit-product', async (id) =>{
                        
        const producto = session_products.find( (product:any) => product.id == id);                  
        
        io.sockets.emit('edit-product-event', producto)
    })

    socket.on('save-product', async (id, data) =>{
           
        let response;       
  
        console.log("id" + id);
        console.log("data" + data);

        if(id){
            response = await updateProduct(id, data)            
            
            console.log(response);
            

            const index = session_products.findIndex((item:any) => item.id == id)
            session_products[index] = response
        }
        else {
                        
            response = await createProduct(data)            
            session_products.push(response)            
            
        }

        io.sockets.emit('products', session_products)
    })    
})

app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static(__dirname + "/public"));

// Motor de plantilla 
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");




app.get("/", async (req: Request, res: Response) => {
    
    if(session_products.length<1) {
        session_products = await getAllProducts()
    }
    
    res.render('main', { layout: 'index', productos: session_products });
});

app.get("/admin", async (req: Request, res: Response) => {

    if(session_products.length<1) {            
        session_products = await getAllProducts()
    }
        
    res.render('admin', { layout: 'index', productos: session_products });
});

server.listen(PORT, () => {
    console.log(`Front corriendo en ${PORT}`);

})