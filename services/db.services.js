import fs from "fs/promises";
import path from "path";
import faker from "faker";
import { writeFile } from "fs";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async(id) => {
        try {
            let data = await fs.readFile(this.dbPath, "utf8");
            let user = JSON.parse(data).find( data => data.id === id);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    static create = async(obj, id) => {
        try {
            let data = await fs.readFile(this.dbPath, "utf8");
            let user = Object.values(obj);
            data.push(user);
            fs.writeFile(this.dbPath, JSON.stringify(data));
            let data2 = await fs.readFile(this.dbPath, "utf8");
            console.log(user);
            console.log(data2);
            return data2;
        } catch (error) {
            console.log(error);
        }
    }

    static update = (obj, id) => {

    }

    static delete = id => {

    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;