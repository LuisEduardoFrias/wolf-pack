import { describe, it, expect, beforeEach } from 'vitest';
import { wolfPackCreate, alpha, Id } from "../src/index.ts";

/*
describe('wolfPackCreate', () => {
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
			phone: Id) {

			super();
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
			password: string,
			phone: Id
		) {
			super();
			this.name = name;
			this.lastName = lastName;
			this.email = email;
			this.user = user;
			this.password = password;
			this.phone = phone;
		}
	};

	let wolfpack: any;
	let newCapacity: CapacityModel;
	let newPhone: PhoneModel;
	let newUser: UserModel;

	beforeEach(async () => {
		newPhone = new PhoneModel(
			'test_imei',
			'http://www.test.com',
			'test_brand',
			'test_model',
			'test_color',
			'test_capacity',
			'12/31/2023'
		);
		newUser = new UserModel(
			'test_name',
			'test_lastName',
			'test@example.com',
			'test_user',
			'test_password',
			'test_imei'
		);
		newCapacity = new CapacityModel(
			'test_rom',
			'test_ramMemory',
			'test_processor',
			'test_processorSpeed',
			'test_phone',
		);
	});

	it('should post a new PhoneModel', async () => {

		wolfpack = wolfPackCreate(
			{
				member: [UserModel, CapacityModel, PhoneModel],
				wolfpack: "phones_store"
			}
		);

		const result = await wolfpack.phones_store.PhoneModel.post(newPhone);
		expect(result).toBeDefined();
		expect(result.imei).toBe('test_imei');
	});

	it('should post a new UserModel', async () => {
		const result = await wolfpack.phones_store.UserModel.post(newUser);
		expect(result).toBeDefined();
		expect(result.user).toBe('test_user');
	});

	it('should update an existing UserModel', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		newUser.name = 'updated_name';
		const updatedUser = await wolfpack.phones_store.UserModel.update(newUser);
		expect(updatedUser).toBeDefined();
		expect(updatedUser.name).toBe('updated_name');
	});

	it('should delete an existing PhoneModel', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const deleteResult = await wolfpack.phones_store.PhoneModel.delete({ imei: 'test_imei' });
		expect(deleteResult).toBeDefined();
		const getResult = await wolfpack.phones_store.PhoneModel.get({ imei: 'test_imei' });
		expect(getResult).toBeNull();
	});

	it('should get a UserModel by primary key', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		const fetchedUser = await wolfpack.phones_store.UserModel.get('test_user');
		expect(fetchedUser).toBeDefined();
		expect(fetchedUser.user).toBe('test_user');
	});

	it('should return null when getting a non-existent UserModel', async () => {
		const fetchedUser = await wolfpack.phones_store.UserModel.get('non_existent_user');
		expect(fetchedUser).toBeNull();
	});

	it('should handle invalid primary key inputs gracefully', async () => {
		expect(await wolfpack.phones_store.UserModel.get('2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('-2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('2+6')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('3-3')).toBeNull();
	});

	it('should get a PhoneModel by a property', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'test_color' });
		expect(fetchedPhone).toBeDefined();
		expect(fetchedPhone.color).toBe('test_color');
	});

	it('should return null when getting a non-existent PhoneModel by property', async () => {
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'blue' });
		expect(fetchedPhone).toBeNull();
	});
});

describe('without references', () => {
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
			phone: Id) {

			super();
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
			password: string,
			phone: Id
		) {
			super();
			this.name = name;
			this.lastName = lastName;
			this.email = email;
			this.user = user;
			this.password = password;
			this.phone = phone;
		}
	};

	let wolfpack: any;
	let newCapacity: CapacityModel;
	let newPhone: PhoneModel;
	let newUser: UserModel;

	beforeEach(async () => {
		wolfpack = wolfPackCreate(
			[{
				member: [UserModel, CapacityModel, PhoneModel],
				wolfpack: "phones_store"
			}], true);

		newPhone = new PhoneModel(
			'test_imei',
			'http://www.test.com',
			'test_brand',
			'test_model',
			'test_color',
			'test_capacity',
			'12/31/2023'
		);

		newUser = new UserModel(
			'test_name',
			'test_lastName',
			'test@example.com',
			'test_user',
			'test_password',
			'test_imei'
		);

		newCapacity = new CapacityModel(
			'test_rom',
			'test_ramMemory',
			'test_processor',
			'test_processorSpeed',
			'test_phone',
		);

		// Ensure the database is clean before each test
		await wolfpack.phones_store.PhoneModel.delete({ imei: 'test_imei' });
		await wolfpack.phones_store.UserModel.delete({ user: 'test_user' });
	});
	
	it('should post a new PhoneModel', async () => {
		const result = await wolfpack.phones_store.PhoneModel.post(newPhone);
		expect(result).toBeDefined();
		expect(result.imei).toBe('test_imei');
	});

	it('should post a new UserModel', async () => {
		const result = await wolfpack.phones_store.UserModel.post(newUser);
		expect(result).toBeDefined();
		expect(result.user).toBe('test_user');
	});

	it('should update an existing UserModel', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		newUser.name = 'updated_name';
		const updatedUser = await wolfpack.phones_store.UserModel.update(newUser);
		expect(updatedUser).toBeDefined();
		expect(updatedUser.name).toBe('updated_name');
	});

	it('should delete an existing PhoneModel', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const deleteResult = await wolfpack.phones_store.PhoneModel.delete({ imei: 'test_imei' });
		expect(deleteResult).toBeDefined();
		const getResult = await wolfpack.phones_store.PhoneModel.get({ imei: 'test_imei' });
		expect(getResult).toBeNull();
	});

	it('should get a UserModel by primary key', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		const fetchedUser = await wolfpack.phones_store.UserModel.get('test_user');
		expect(fetchedUser).toBeDefined();
		expect(fetchedUser.user).toBe('test_user');
	});

	it('should return null when getting a non-existent UserModel', async () => {
		const fetchedUser = await wolfpack.phones_store.UserModel.get('non_existent_user');
		expect(fetchedUser).toBeNull();
	});

	it('should handle invalid primary key inputs gracefully', async () => {
		expect(await wolfpack.phones_store.UserModel.get('2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('-2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('2+6')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('3-3')).toBeNull();
	});

	it('should get a PhoneModel by a property', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'test_color' });
		expect(fetchedPhone).toBeDefined();
		expect(fetchedPhone.color).toBe('test_color');
	});

	it('should return null when getting a non-existent PhoneModel by property', async () => {
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'blue' });
		expect(fetchedPhone).toBeNull();
	});
});
*/

describe('with references', () => {

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
			capacity: Id,
			releaseDate: string
		) {
			super();
			this.entity_config = {
				primaryKey: "imei",
				entity_ref: [
					{
						primaryKey: 'id',
						foreignKey: 'capacity',
						entity: 'CapacityModel'
					}
				],
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
	class CapacityModel extends alpha {
		rom: string;
		ramMemory: string;
		processor: string;
		processorSpeed: string;

		constructor(
			rom: string,
			ramMemory: string,
			processor: string,
			processorSpeed: string
		) {
			super();
			this.rom = rom;
			this.ramMemory = ramMemory;
			this.processor = processor;
			this.processorSpeed = processorSpeed;
			this.phone = phone;
		}
	};

	let wolfpack: any;
	let newCapacity: CapacityModel;
	let newPhone: PhoneModel;
	let newUser: UserModel;

	beforeEach(async () => {
		wolfpack = wolfPackCreate(
			{
				member: [UserModel, CapacityModel, PhoneModel],
				wolfpack: "phones_store"
			});

		newCapacity = new CapacityModel(
			'test_rom',
			'test_ramMemory',
			'test_processor',
			'test_processorSpeed',
			'test_phone',
		);
		newPhone = new PhoneModel(
			'test_imei',
			'http://www.test.com',
			'test_brand',
			'test_model',
			'test_color',
			newCapacity.id,
			'12/31/2023'
		);
		newUser = new UserModel(
			'test_name',
			'test_lastName',
			'test@example.com',
			'test_user',
			'test_password',
			newPhone.imei
		);
	});

	it('should post a new CapacityModel', async () => {
		const result = await wolfpack.phones_store.CapacityModel.post(newCapacity);
		expect(result).toBeDefined();
		expect(result.rom).toBe('test_rom');
	});

	/*
	it('should post a new PhoneModel', async () => {
		const result = await wolfpack.phones_store.PhoneModel.post(newPhone);
		expect(result).toBeDefined();
		expect(result.imei).toBe('test_imei');
	});

	it('should post a new UserModel', async () => {
		const result = await wolfpack.phones_store.UserModel.post(newUser);
		expect(result).toBeDefined();
		expect(result.user).toBe('test_user');
	});

	it('should update an existing UserModel', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		newUser.name = 'updated_name';
		const updatedUser = await wolfpack.phones_store.UserModel.update(newUser);
		expect(updatedUser).toBeDefined();
		expect(updatedUser.name).toBe('updated_name');
	});

	it('should delete an existing PhoneModel', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const deleteResult = await wolfpack.phones_store.PhoneModel.delete({ imei: 'test_imei' });
		expect(deleteResult).toBeDefined();
		const getResult = await wolfpack.phones_store.PhoneModel.get({ imei: 'test_imei' });
		expect(getResult).toBeNull();
	});

	it('should get a UserModel by primary key', async () => {
		await wolfpack.phones_store.UserModel.post(newUser);
		const fetchedUser = await wolfpack.phones_store.UserModel.get('test_user');
		expect(fetchedUser).toBeDefined();
		expect(fetchedUser.user).toBe('test_user');
	});

	it('should return null when getting a non-existent UserModel', async () => {
		const fetchedUser = await wolfpack.phones_store.UserModel.get('non_existent_user');
		expect(fetchedUser).toBeNull();
	});

	it('should handle invalid primary key inputs gracefully', async () => {
		expect(await wolfpack.phones_store.UserModel.get('2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('-2')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('2+6')).toBeNull();
		expect(await wolfpack.phones_store.UserModel.get('3-3')).toBeNull();
	});

	it('should get a PhoneModel by a property', async () => {
		await wolfpack.phones_store.PhoneModel.post(newPhone);
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'test_color' });
		expect(fetchedPhone).toBeDefined();
		expect(fetchedPhone.color).toBe('test_color');
	});

	it('should return null when getting a non-existent PhoneModel by property', async () => {
		const fetchedPhone = await wolfpack.phones_store.PhoneModel.get({ color: 'blue' });
		expect(fetchedPhone).toBeNull();
	});
*/

});
