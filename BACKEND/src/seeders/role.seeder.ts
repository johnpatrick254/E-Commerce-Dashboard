import { connection } from "../../config/ormconfig";
import { Permision } from "../entities/permision.entity";
import { Role } from "../entities/role.entity";


// if(!connection.initialize())process.exit();
export const seedPerms = async()=>{

    const permisionRepository= connection.getRepository(Permision);
    const permisions = ["view_users","edit_users","view_roles","edit_roles","view_products","edit_products","view_orders","edit_orders"]
    let perms = [];
    for(const perm of permisions){
       perms.push( await permisionRepository.save({
            name:perm
        }))
    }
  const roleRepository = connection.getRepository(Role);
  await roleRepository.save(
    {
        name:'Admin',
        permisions:perms
    }
  )

  delete perms[3];

  await roleRepository.save(
    {
        name:'Editors',
        permisions:perms
    }
  )

  delete perms[1]
  delete perms[3]
  delete perms[5]
  delete perms[7]
  
  await roleRepository.save(
    {
        name:'Viewer',
        permisions:perms
    }
  )

}

