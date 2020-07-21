export class User {
  id: any;
  username: string;
  password: string;
  fullName: string;
  birthDate?: any;
  gender?: any;
  emailAddress: string;
  phoneNumber: any;
  roleId: any;
  roleName: string;
  userAvatarUrl: any;
  status: any;
  createdDate: any;
  createdBy: any
}

export class Lecturer extends User{
  departmentCode: any;
  departmentName: string
}

export class Student extends User{
  classCode: string
}
