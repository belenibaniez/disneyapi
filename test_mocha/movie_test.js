var chai    = require("chai");
var assert  = require("chai").assert;
var expect  = require("chai").expect;
let chaiHttp = require('chai-http');
const path = require('path');

const app= require('../index')

chai.use(chaiHttp);
const url= 'http://localhost:8080';
let token




describe('Insert a Movie ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    done();
                });
    })




    it('Should insert a movie successfully',(done)=>{
        chai.request(url)
        .post('/movies')
        .set({'token': token})
        .send({
            "title":"soul",
            "year":2020,
            "score":4.2        
        })
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal("Movie Created successfully")
    expect(res.body).to.have.property('data')
   
    done();
    } )
    }  )


    


   

    it('should recibe an error, because insert a movie that already exists',(done)=>{
        chai.request(url)
        .post('/movies')
        .set({'token': token})
        .send({
            "title":"soul",
            "year":2020,
            "score":4.2        
        }           )
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("The movie already exist")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

    it('should recibe an error, because try insert a movie without title',(done)=>{
        chai.request(url)
        .post('/movies')
        .set({'token': token})
        .send({
           
            "year":2020,
            "score":4.2        
        }           )
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

    it('should receive an error, because send token empty',(done)=>{
        chai.request(url)
        .post('/characters')
        .send({  
            "title":"Cruella",
        "year": 2021        
    })
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

  
    

})



describe('Add character to movie:', ()=>{


    it('should receibe error, try add repetead character',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/characters`)
        .set({'token': token})
        .send({ "characters":[{
    "name": "Kronk Pepikrankenitz",
    "age":20},
    {
        "name": "Kronk Pepikrankenitz",
        "age":18}
        ]
        }
     
    )
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("There are repeated characters")

    done();
    } )
    })

    it('should add character to movie successfully',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/characters`)
        .set({'token': token})
        .send({ "characters":[{
    "name": "Kronk Pepikrankenitz",
    "age":20}
        ]
        }
     
    )
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal("Characters created and added successfully")

    done();
    } )
    })



    it('should receive an error,because try add character already exist',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/characters`)
        .set({'token': token})
        .send({ "characters":[{
    "name": "Kronk Pepikrankenitz",
    "age":20}
        ]
        }
     
    )
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('errors')

    done();
    } )
    })


    it('should receive an error,because try add character without name ',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/characters`)
        .set({'token': token})
        .send({ "characters":[
{
    "age":20}
        ]
        }
     
    )
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('errors')

    done();
    } )
    })



})


describe('Upload file movie: ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    done();
                });
    })



    it('should uploadfile succesfully',(done)=>{
        chai.request(url)
        .post(`/movies/upload/1`)
        .set({'token': token})
        .attach('file',  path.join(__dirname, `../test_mocha/img/`, "dumbo1941.jpg"))
    .end((err, res) => { 
    console.log(res.body)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    done();
    } )


} )


it('should receive an error, lead empty file',(done)=>{
    chai.request(url)
    .post(`/movies/upload/1`)
    .set({'token': token})
.end((err, res) => { 
console.log(res.body)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('message').to.equal("No File to upload")

done();
} )


} )


it('should recibe an error, pdf files are not allowed ',(done)=>{
    chai.request(url)
    .post(`/movies/upload/1`)
    .set({'token': token})
    .attach('file',  path.join(__dirname, `../test_mocha/img`, "Dumbo.pdf"))
.end((err, res) => { 
console.log(res.body)
expect(res).to.have.status(500);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('message').to.equal("Something goes wrong")

done();
} )


} )

})







describe('search Movie: ', ()=>{



    it('search with title',(done)=>{
        chai.request(url)
        .get(`/movies`)
        .query({
            "title":"emperado"
        })
    .end((err, res) => { 
    console.log(res.body.errors)
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('data');

    done();
    } )


} )


it('search with genre',(done)=>{
    chai.request(url)
    .get(`/movies`)
    .query({
        genre:"comedy"
    })
.end((err, res) => { 
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data').which.have.an('object')

done();
} )


} )




it('search all',(done)=>{
    chai.request(url)
    .get(`/movies`)
   
.end((err, res) => { 
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )



it('search all paginated',(done)=>{
    chai.request(url)
    .get(`/movies`)
    .query({
        limit:20,
        offset:1
    })
.end((err, res) => { 
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )



})





describe('search movie with details: ', ()=>{

  


    it('search with id exists',(done)=>{
        chai.request(url)
        .get(`/movies/${1}`)

    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('data');

    done();
    } )


} )


it('should fail, the id is non-existent',(done)=>{
    chai.request(url)
    .get(`/movies/${17}`)

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )


} )


} )




describe('Update a movie ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    
                    done();
                });
    })




    it('should update title of movie sucessfully',(done)=>{
        chai.request(url)
        .put(`/movies/${3}`)
        .set({'token': token})
        .send({title:"Aladdin y los 40 ladrones"})
    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Movie updated successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )

    it('should update year of movie successfully',(done)=>{
        chai.request(url)
        .put(`/movies/${3}`)
        .set({'token': token})
        .send({year:1996})

    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Movie updated successfully');
    expect(res.body).to.have.property('data');

    done();
    } )


} )




it('update failed, update movie with non-existent id',(done)=>{
    chai.request(url)
    .put(`/movies/${17}`)
    .set({'token': token})
    .send({age:1000})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


it('update failed, update movie status ',(done)=>{
    chai.request(url)
    .put(`/movies/${3}`)
    .set({'token': token})
    .send({status:false})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('message').to.equal('No data to update');

done();
} )

} )


} )






describe('Delete a movie ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    
                    done();
                });
    })




    it('should delete a movie succefully ',(done)=>{
        chai.request(url)
        .delete(`/movies/${1}`)
        .set({'token': token})

    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Movie deleted successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )

 

it('delete failed, delete movie non-existent id',(done)=>{
    chai.request(url)
    .delete(`/characters/${20}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )



} )





describe('Delete a character to movie ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    
                    done();
                });
    })




    it('should delete a character successfully ',(done)=>{
        chai.request(url)
        .delete(`/movies/${2}/characters/${3}`)
        .set({'token': token})

    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Character deleted successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )


    
it('delete failed, delete movie non-existent id',(done)=>{
    chai.request(url)
    .delete(`/movies/${20}/characters/${1}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


it('delete failed, delete character non-existent id',(done)=>{
    chai.request(url)
    .delete(`/movies/${1}/characters/${20}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )



it('delete failed, the movie does not belong to the character',(done)=>{
    chai.request(url)
    .delete(`/movies/${1}/characters/${10}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


})




describe('Add genre to movie:', ()=>{

    it('should add genre to movie successfully',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/genres/${1}`)
        .set({'token': token})
       
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal("Genre added successfully")

    done();
    } )
    })



    it('should receive an error,because try add genre already exist',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/genres/${1}`)
        .set({'token': token})
     
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

    it('should receive an error,because try add non-existent id',(done)=>{
        chai.request(url)
        .post(`/movies/${7}/genres/${46}`)
        .set({'token': token})
     
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('errors')

    done();
    } )
    })




})





describe('Delete a genre  to movie ', ()=>{

    before((done)=> {
        let loginUser={ "email": "admin@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/login')
                .send(loginUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(200);
                    
                    done();
                });
    })




    it('should delete a genre successfully ',(done)=>{
        chai.request(url)
        .delete(`/movies/${2}/genres/${3}`)
        .set({'token': token})

    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Genre deleted successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )


    
it('delete failed, try delete when movie non-existent id',(done)=>{
    chai.request(url)
    .delete(`/movies/${20}/genres/${1}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


it('delete failed, delete genre non-existent id',(done)=>{
    chai.request(url)
    .delete(`/movies/${2}/genres/${20}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )



it('delete failed, the genre does not belong to the movie',(done)=>{
    chai.request(url)
    .delete(`/movies/${2}/genres/${3}`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(401);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


})
