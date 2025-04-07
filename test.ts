import { wolfPackCreate, EventHandler, alpha } from "./src/index.js";
import { TypeTypeId } from './src/models/type_id.js'

class CapacityModel extends alpha {
  rom: string;
  ramMemory: string;
  processor: string;
  processorSpeed: string;

  constructor(
    rom: string,
    ramMemory: string,
    processor: string,
    processorSpeed: string,
    phone: TypeId) {

    super({
      entityRef: [
        {
          primaryKey: 'imei',
          foreignKey: 'phone',
          entity: 'PhoneModel'
        }
      ]
    })

    this.rom = rom;
    this.ramMemory = ramMemory;
    this.processor = processor;
    this.processorSpeed = processorSpeed;
    this.phone = phone;
  }
};
class PhoneModel extends alpha {
  imei: string;
  imgUrl: string;
  brand: string;
  model: string;
  color: string;
  capacity: string;
  releaseDate: string;
  isRemoved: boolean;

  constructor(
    imei: string,
    imgUrl: string,
    brand: string,
    model: string,
    color: string,
    capacity: string,
    releaseDate: string) {

    super({
      primaryKey: "imei",
    })

    this.imei = imei;
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.capacity = capacity;
    this.releaseDate = releaseDate;
    this.isRemoved = false;
  }
};
class UserModel extends alpha {
  name: string;
  lastName: string;
  email: string;
  user: string;
  password: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    user: string,
    password: string,
    phone: TypeId
  ) {
    super({
      primaryKey: "user",
      unique: ["email", "password"],
      entityRef: [
        {
          primaryKey: 'imei',
          foreignKey: 'phone',
          entity: 'PhoneModel'
        }
      ],
    })

    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.user = user;
    this.password = password;
    this.phone = phone;
  }
};

const wolfpack = wolfPackCreate(
  {
    member: [UserModel, CapacityModel, PhoneModel],
    wolfpack: "phones"
  });

const newPhone = new PhoneModel(
  'hs6jwjwi8skskls9kw',
  'http://www.eje.com',
  'samsung',
  'galaxy',
  'azul',
  '256gb',
  '11/27/2027'
)
const newUser = new UserModel(
  'carlos',
  'morales',
  'carlos@gmail.com',
  'moralesC',
  'mc17892k',
  'hs6jwjwi8skskls9kw',
)

EventHandler.on('phones:PhoneModel:post', (data) => {
  console.log('data: ', data)
});

console.log("post phone: ", await wolfpack.phones.PhoneModel.post(newPhone))

console.log('get phone: ', await wolfpack.phones.PhoneModel.get());
