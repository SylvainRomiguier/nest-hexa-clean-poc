export class Agent {
  private readonly _id: Id;
  private readonly _firstName: Name;
  private readonly _lastName: Name;
  private readonly _photoUrl: ImageUrl;
  private readonly _phone: Phone;
  private readonly _email: Email;
  private _status:Status;
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    photoUrl: string | undefined,
    phone: string,
    email: string
  ) {
    this._id = new Id(id);
    this._firstName = new Name(firstName);
    this._lastName = new Name(lastName);
    this._photoUrl = new ImageUrl(photoUrl);
    this._phone = new Phone(phone);
    this._email = new Email(email);
    this._status = Status.From("Activated");
  }

  activate() {
    this._status = Status.From("Activated");
  }

  deactivate() {
    this._status = Status.From("Deactivated");
  }

  get() {
    return {
      id: this._id.get(),
      firstName: this._firstName.get(),
      lastName: this._lastName.get(),
      photoUrl: this._photoUrl.get(),
      phone: this._phone.get(),
      email: this._email.get(),
      status: this._status.get()
    };
  }
}

export class Id {
  private readonly _value: string;
  constructor(value: string) {
    if (value.length < 1) {
      throw new Error('Id must not be empty.');
    }
    this._value = value;
  }
  get() {
    return this._value;
  }
  equals(value: Id) {
    return this._value === value.get();
  }
}

export class Name {
  private readonly _value: string;
  constructor(value: string) {
    if (value.length < 3) {
      throw new Error('Name must have at least 3 characters.');
    }
    this._value = value;
  }
  get() {
    return this._value;
  }
}

export class ImageUrl {
  private readonly _value: string;
  constructor(value: string) {
    if (value.length < 1) {
      this._value =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
    } else {
      this._value = value;
    }
  }
  get() {
    return this._value;
  }
}

export class Phone {
  private readonly _value: string;
  constructor(value: string) {
    if (!value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
      throw new Error('Phone number is not valid.');
    }
    this._value = value;
  }
  get() {
    return this._value;
  }
}

export class Email {
  private readonly _value: string;
  constructor(value: string) {
    if (
      !value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      )
    ) {
      throw new Error('Email address is not valid.');
    }
    this._value = value;
  }
  get() {
    return this._value;
  }
}



export abstract class Status {
  get () {
    return "Status";
  }
  public static From(status:string):Status {
    switch(status) {
      case "Activated": return new Activated();
      case "Deactivated": return new Deactivated();
      default: throw new Error(`Invalid status value ${status}, waiting for Activated or Deactivated.`)
    }
  }
}

export class Activated extends Status {
  override get () {
    return "Activated"
  }
}

export class Deactivated extends Status {
  override get () {
    return "Deactivated"
  }
}