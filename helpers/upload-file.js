const path=require('path')


const uploadFile=(files,id,directory,extencionesValidas=['jpg'] )=>{
    return new Promise((resolve, reject)=>{
        const {file} = files;
        const splitName=file.name.split('.');
        const extension= splitName[splitName.length-1]
    
        //validar extension
        if (!extencionesValidas.includes(extension)){

             return reject (`La extension ${extension} no es permitida, ${extencionesValidas}`);
            }
    
        const nombreTemp=id+'.'+extension;
    
        const uploadPath = path.join(__dirname, `../uploads/${directory}/`, nombreTemp);
    
        file.mv(uploadPath, function(err) {
          if (err) {
          reject(err);
          }
      
         resolve(nombreTemp);
        });

    })

}


module.exports= { uploadFile}