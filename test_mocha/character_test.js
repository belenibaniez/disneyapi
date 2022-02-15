var chai    = require("chai");
var assert  = require("chai").assert;
var expect  = require("chai").expect;
let chaiHttp = require('chai-http');
const path = require('path');

const app= require('../index')

chai.use(chaiHttp);
const url= 'http://localhost:8080';
let token

describe('Insert a Character:', ()=>{

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



    it('should insert a character successfully',(done)=>{
        chai.request(url)
        .post('/characters')
        .set({'token': token})
        .send({  "name":"Simba",
        "story": "Simba es un juguetón e independiente cachorro de león a quien le gusta correr y explorar. Es el único hijo de Mufasa, el rey de la sabana y jefe de “La Roca del Rey”. ",
        "age":25
        
    })
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal("Character created successfully")
    expect(res.body).to.have.property('data').which.is.an('object')
    done();
    } )
    }  )

   
    it('should receive an error, because insert a character that already exists',(done)=>{
        chai.request(url)
        .post('/characters')
        .set({'token': token})
        .send({  "name":"Lilo PELEKAI",
        "age": 6
        
    })
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("The character already exists")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

   
    it('should receive an error, because insert a character whitout name',(done)=>{
        chai.request(url)
        .post('/characters')
        .set({'token': token})
        .send({  
        "age": 17,
        "story": "Hermana de lilo"
        
    })
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
            "name":"NANI PELAKAI",
        "age": 17,
        "story": "Hermana de lilo"
        
    })
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

    it('should receive an error, because send invalid token',(done)=>{
        tokeninvalido="rhU1Hj2n3UOFpYh434veI0r1Cgr7Gn3B9PKc3_FUtFVpXSEYTZY1qhBWkMDnu0FcdyW8Y3rPopX-fyn5l3bh0clzYrKffo-4aURujdhsAsKAAhbqE_IOBNoRZqW3qHrhDLoRqlpaEfIXiIiaRaveTsSIQ-UWUUXmhptCbi5EPboZJmQn_aFosE3ZQ_VtmVXtZgzkZqUujzOd4M2PZCaNlpSbYasYfvugTJOdCRy-Fo8BZslUbU828tRpuSi4OW11eQ4yLcLzS5Q8e3j3X8TE0tZLZyi37NFLT-RjzHns_QGOmOKcH8x571Oj1a9uKEHs0ULH2aiOxqksCg5Uz-5n5RcyjfoFKfscx6EfM0eWkoaMnrA1AXZ1IO4TGn67ccYaW76AYKZDrFFcelX7eQzeDhyx_P4SnPt54kxcozqvZd24ErCFXd_lqogbHB7Rvv0Fm5jb3op-m7Kdhrylar7yyWwId1L5QG_tyqgWwDlm_JuCqlLnjute7chrZkuZnXLLeMdz8eUg7sHZGlITktkNOQ"
        chai.request(url)
        .post('/characters')
        .set({'token': tokeninvalido})
        .send({  
            "name":"NANI PELAKAI",
        "age": 17,
        "story": "Hermana de lilo"
        
    })
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")

    done();
    } )
    })



})



describe('Add movies to character:', ()=>{

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


    it('should receibe error, try add a repetead movie to character ',(done)=>{
        chai.request(url)
        .post(`/characters/${17}/movies`)
        .set({'token': token})
        .send({"movies":
        [{
    "title":"Las locuras de Kronk",
        "year":2005,
        "score":4
    }, {
        "title":"Las locuras de Kronk",
            "year":2005,
            "score":4.2
        }
    ]
        })
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("There are repeated movies")
    expect(res.body).to.have.property('data')
    done();
    } )
    }  )


    it('should add movie to character sucessfully ',(done)=>{
        chai.request(url)
        .post(`/characters/${17}/movies`)
        .set({'token': token})
        .send({"movies":
        [{
    "title":"Las locuras de Kronk",
        "year":2005,
        "score":4
    }
    ]
        })
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal("Movies created successfully")
    expect(res.body).to.have.property('data')
    done();
    } )
    }  )

   

    it('should receive an error, because insert a movie that already exists',(done)=>{
        chai.request(url)
        .post(`/characters/${17}/movies`)
        .set({'token': token})
        .send({"movies":[
            {
                "title":"Las locuras de Kronk",
                "year":2005
            }
        ]

        } )
    .end((err, res) => { 
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("The movie already exists")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

   
    it('should receive an error, because insert a movie whitout title',(done)=>{
        chai.request(url)
        .post('/characters')
        .set({'token': token})
        .send([{
            "year":2000
        }])
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
        .send({"movies":
        [{
        "title":"las locuras del emperador",
        "year":2000
    },{
    "title":"Las locuras de Kronk",
        "year":2005
    }
    ]})
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")
    expect(res.body).to.have.property('errors')

    done();
    } )
    })

    it('should receive an error, because send invalid token',(done)=>{
        tokeninvalido="rhU1Hj2n3UOFpYh434veI0r1Cgr7Gn3B9PKc3_FUtFVpXSEYTZY1qhBWkMDnu0FcdyW8Y3rPopX-fyn5l3bh0clzYrKffo-4aURujdhsAsKAAhbqE_IOBNoRZqW3qHrhDLoRqlpaEfIXiIiaRaveTsSIQ-UWUUXmhptCbi5EPboZJmQn_aFosE3ZQ_VtmVXtZgzkZqUujzOd4M2PZCaNlpSbYasYfvugTJOdCRy-Fo8BZslUbU828tRpuSi4OW11eQ4yLcLzS5Q8e3j3X8TE0tZLZyi37NFLT-RjzHns_QGOmOKcH8x571Oj1a9uKEHs0ULH2aiOxqksCg5Uz-5n5RcyjfoFKfscx6EfM0eWkoaMnrA1AXZ1IO4TGn67ccYaW76AYKZDrFFcelX7eQzeDhyx_P4SnPt54kxcozqvZd24ErCFXd_lqogbHB7Rvv0Fm5jb3op-m7Kdhrylar7yyWwId1L5QG_tyqgWwDlm_JuCqlLnjute7chrZkuZnXLLeMdz8eUg7sHZGlITktkNOQ"
        chai.request(url)
        .post('/characters')
        .set({'token': tokeninvalido})
        .send({  
            "name":"NANI PELAKAI",
        "age": 17,
        "story": "Hermana de lilo"
        
    })
    .end((err, res) => { 
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    expect(res.body).to.have.property('message').to.equal("Validation Failed")

    done();
    } )
    })



})



describe('Upload file character: ', ()=>{

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
        .post(`/characters/upload/1`)
        .set({'token': token})
        .attach('file',  path.join(__dirname, `../test_mocha/img/`, "Dumbo.jpg"))
    .end((err, res) => { 
    console.log(res.body)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);


    done();
    } )


} )


it('should recive an error, load empty file',(done)=>{
    chai.request(url)
    .post(`/characters/upload/1`)
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
    .post(`/characters/upload/1`)
    .set({'token': token})
    .attach('file',  path.join(__dirname, `../test_mocha/img/`, "Dumbo.pdf"))
.end((err, res) => { 
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('message').to.equal("La extension pdf no es permitida, jpg")

done();
} )


} )

})








describe('search character: ', ()=>{

   
    it('search with age',(done)=>{
        chai.request(url)
        .get(`/characters`)
        .query({
            age:15
        })
    .end((err, res) => { 
    console.log(res.body.errors)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('data');

    done();
    } )


} )


it('search with name',(done)=>{
    chai.request(url)
    .get(`/characters`)
    .query({
        name:"jumbo"
    })
.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data').which.have.an('object')

done();
} )


} )



it('search with id_movie',(done)=>{
    chai.request(url)
    .get(`/characters`)
    .query({
        id_movie:"4"
    })
.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )

it('search with weight',(done)=>{
    chai.request(url)
    .get(`/characters`)
    .query({
        weight:54.4
    })
.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )


it('search all',(done)=>{
    chai.request(url)
    .get(`/characters`)
   
.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )



it('search all paginated',(done)=>{
    chai.request(url)
    .get(`/characters`)
    .query({
        limit:10,
        offset:1
    })
.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('data');

done();
} )


} )



})



describe('search character detail: ', ()=>{


    it('search with id exists',(done)=>{
        chai.request(url)
        .get(`/characters/${1}`)

    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('data');

    done();
    } )


} )


it('should fail, the id is non-existent',(done)=>{
    chai.request(url)
    .get(`/characters/${20}`)

.end((err, res) => { 
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )


} )


} )



describe('Update a character', ()=>{

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




    it('should update name of character successfully',(done)=>{
        chai.request(url)
        .put(`/characters/${13}`)
        .set({'token': token})
        .send({name:"Genio de la lampara"})
    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Character updated successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )

    it('should update age of character ',(done)=>{
        chai.request(url)
        .put(`/characters/${13}`)
        .set({'token': token})
        .send({age:1000})

    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Character updated successfully');
    expect(res.body).to.have.property('data');

    done();
    } )


} )

it('should update weigth of character',(done)=>{
    chai.request(url)
    .put(`/characters/${13}`)
    .set({'token': token})
    .send({weigth:0})

.end((err, res) => { 
expect(res).to.have.status(200);
expect(res.body).to.have.property('success').to.equal(true);
expect(res.body).to.have.property('message').to.equal('Character updated successfully');

expect(res.body).to.have.property('data');

done();
} )


} )


it('update failed, update character with non-existent id',(done)=>{
    chai.request(url)
    .put(`/characters/${20}`)
    .set({'token': token})
    .send({age:1000})

.end((err, res) => { 
    console.log(res.body)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


it('update failed, update character status ',(done)=>{
    chai.request(url)
    .put(`/characters/${13}`)
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






describe('Delete a character ', ()=>{

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




    it('should delete a character succefully ',(done)=>{
        chai.request(url)
        .delete(`/characters/${13}`)
        .set({'token': token})

    
    .end((err, res) => { 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Character deleted successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )

 

it('delete failed, delete character non-existent id',(done)=>{
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









describe('Delete a movie to character ', ()=>{

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
        .delete(`/characters/${14}/movies/${6}`)
        .set({'token': token})

    
    .end((err, res) => { 
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success').to.equal(true);
    expect(res.body).to.have.property('message').to.equal('Movie deleted successfully');
    
    expect(res.body).to.have.property('data');
    
    done();
    } )
    
    
    } )


    
it('delete failed, delete character non-existent id',(done)=>{
    chai.request(url)
    .delete(`/characters/${20}/movies/1`)
    .set({'token': token})

.end((err, res) => { 
    console.log(res.body.errors)
expect(res).to.have.status(400);
expect(res.body).to.have.property('success').to.equal(false);
expect(res.body).to.have.property('errors')

done();
} )

} )


it('delete failed, delete movie non-existent id',(done)=>{
    chai.request(url)
    .delete(`/characters/${1}/movies/10`)
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
    .delete(`/characters/${1}/movies/${3}`)
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
