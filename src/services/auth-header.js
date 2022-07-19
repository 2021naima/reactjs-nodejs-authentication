export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));
  const id = JSON.parse(localStorage.getItem('id'));

  if (id && token) {
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
     return { 'x-access-token': token };       // for Node.js Express back-end
  } else {
    return {};
  }
}