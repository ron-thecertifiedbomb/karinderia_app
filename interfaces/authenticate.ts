export interface FormLogInData {
  username: string;
  firstName?: string;
  lastname?: string;
  password: string;
  isLoggedIn?: boolean;
  lastLoggedIn?: string;
  timeCreated?: string;
}



export interface User {
  username?: string;
  firstName?: string;
  lastname?: string;
  password?: string;
  isLoggedIn?: boolean;
  lastLoggedIn?: string;

}
