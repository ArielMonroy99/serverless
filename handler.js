'use strict';
require('dotenv').config({path: './.env'})
const Pet = require("./dto/Pet")
const Owner = require("./dto/Owner")
const connectDatabase = require("./mongo")

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.savePet = async (event) => {
  const {name,age,specie,race } = JSON.parse(event.body)

  const pet = new Pet({
    name: name,
    age: age,
    specie: specie,
    race: race
  })
   
  try{
    await connectDatabase()
    await Pet.create(pet)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Pet created successfully!',
          pet: pet,
        },
        null,
        2
      ),
    };
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error creating pet!',
          error: err,
        },
        null,
        2
      ),
    };
  }

}

module.exports.getPetById = async (event) => {
  const {id} = event.pathParameters

  try{
    await connectDatabase()
    const pet = await Pet.findById(id)
    return {
      statusCode: 200,
      body: JSON.stringify(pet)
    }
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error getting pet!',
          error: err,
        },
        null,
        2
      ),
    };
  }

}

module.exports.updatePet = async (event) => {
  const {id,name,age,specie,race} = JSON.parse(event.body)
  console.log(id,name,age);

    await connectDatabase()
    let pet = await Pet.findById(id)
    pet.name = name
    pet.age = age
    pet.specie = specie
    pet.race = race 
    console.log(pet) 
    pet.save()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Pet updated successfully!',
          pet: pet,
        },
      ),
    };
  
  // catch(error){
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(
  //       {
  //         message: 'Error updating pet!',
  //         error: error,
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // }

}

module.exports.getAllPets = async (event) => {
  try{
    await connectDatabase()
    const pets = await Pet.find()
    return {
      statusCode: 200,
      body: JSON.stringify(pets)
    }
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error getting pets!',
          error: err,
        },
        null,
        2
      ),
    };
  }
}
module.exports.deletePet = async (event) => {
  const {id} = event.pathParameters
  try{
    await connectDatabase()
    await Pet.deleteOne({_id:id})
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Pet deleted successfully!',
        },
        null,
        2
      ),
    };

  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error deleting pet!',
          error: err,
        },
        null,
        2
      ),
    };
  }

}

module.exports.saveOwner = async (event) => {
  const {name,phone,email,address} = JSON.parse(event.body)
  console.log(name,phone,email,address)
  const owner = new Owner({
    name: name,
    phone: phone,
    email: email,
    address: address
  })
  console.log(owner);
    await connectDatabase()
    await Owner.create(owner)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Owner created successfully!',
          owner: owner,
        },
        null,
        2
      ),
    };
  
  // catch(err){
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(
  //       {
  //         message: 'Error creating owner!',
  //         error: err,
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // }
}
module.exports.getOwnerById = async (event) => {
  const {id} = event.pathParameters
  try{
    await connectDatabase()
    const owner = await Owner.findById(id)
    return {
      statusCode: 200,
      body: JSON.stringify(owner)
    }
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error getting owner!',
          error: err,
        },
        null,
        2
      ),
    };
  }
}
module.exports.updateOwner = async (event) => {
  const {id,name,phone,email,address} = JSON.parse(event.body)
  
    await connectDatabase()
    let owner = await Owner.findById(id)
    owner.name = name
    owner.phone = phone
    owner.email = email
    owner.address = address
    owner.save()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Owner updated successfully!',
          owner: owner,
        },
      ),
    };
  
  // catch(error){
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(
  //       {
  //         message: 'Error updating owner!',
  //         error: error,
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // }
}
module.exports.getAllOwners = async (event) => {
  try{
    await connectDatabase()
    const owners = await Owner.find()
    return {
      statusCode: 200,
      body: JSON.stringify(owners)
    }
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error getting owners!',
          error: err,
        },
        null,
        2
      ),
    };
  }
}
module.exports.deleteOwner = async (event) => {
  const {id} = event.pathParameters
  try{
    await connectDatabase()
    await Owner.deleteOne({_id:id})
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Owner deleted successfully!',
        },
        null,
        2
      ),
    };
  }
  catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error deleting owner!',
          error: err,
        },
        null,
        2
      ),
    };
  }
}
