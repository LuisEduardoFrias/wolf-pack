import { wolfPackCreate } from "./index.ts";
import { alpha } from "./src/models/alpha.ts";

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
		password: string) {
		super();
		this.entity_config = {
					primaryKey: "user",
					unique: ["email", "password"],
					foreignKey: 'id',
					entity_ref: 'PhoneModel'
				}
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.user = user;
		this.password = password;
	}
};

const wolfpack = wolfPackCreate(
	{
		member: [UserModel, PhoneModel, CapacityModel],
		wolfpack: "phones"
	}, true);

const newUser = new UserModel(
	'luis joso',
	'frias',
	'luisJodofrias@gmail.com',
	'luisEJ',
	'el19014'
)

console.log("post: ", await wolfpack.phones.UserModel.post(newUser))

console.log('get: ', await wolfpack.phones.UserModel.get());
