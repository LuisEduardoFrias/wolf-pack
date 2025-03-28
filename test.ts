import { wolfPackCreate } from "./index.ts";
import { alpha, Id } from "./src/models/alpha.ts";

class CapacityModel extends alpha {
	rom: string;
	ramMemory: string;
	processor: string;
	processorSpeed: string;

	constructor(
		rom: string,
		ramMemory: string,
		processor: string,
		processorSpeed: string) {

		super();
		this.rom = rom;
		this.ramMemory = ramMemory;
		this.processor = processor;
		this.processorSpeed = processorSpeed;
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

		super();
		this.entity_config = {
			primaryKey: "imei",
		}
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
		phone: Id
	) {
		super();
		this.entity_config = {
			primaryKey: "user",
			unique: ["email", "password"],
			entity_ref: [
				{
					primaryKey: 'imei',
					foreignKey: 'phone',
					entity: 'PhoneModel'
				}
			],
		}
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
		member: [UserModel, PhoneModel, CapacityModel],
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

//console.log("post1 phone: ", await wolfpack.phones.PhoneModel.post(newPhone))
//console.log("post2 user: ", await wolfpack.phones.UserModel.post(newUser))

console.log('get: ', await wolfpack.phones.UserModel.get());
console.log('get: ', await wolfpack.phones.PhoneModel.get());
