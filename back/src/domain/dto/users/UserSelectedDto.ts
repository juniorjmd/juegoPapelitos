export class UserSelectedDto {
  public id: string;
  public name: string;
  public email: string;
  public checked: boolean; 

  constructor(id: string, name: string, email: string, checked: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.checked = checked;
  }

}
