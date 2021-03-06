const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'token';

const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN))
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function register(signupRequest) {
  return request({
    url: API_BASE_URL + '/api/auth/signup',
    method: 'POST',
    body: JSON.stringify(signupRequest),
  });
}

export function loginRequest(signinRequest) {
  return request({
    url: API_BASE_URL + '/api/auth/signin',
    method: 'POST',
    body: JSON.stringify(signinRequest),
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url:
      API_BASE_URL + '/api/user/checkUsernameAvailability?username=' + username,
    method: 'GET',
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + '/api/user/checkEmailAvailability?email=' + email,
    method: 'GET',
  });
}

export function getProblemsReported() {
  return request({
    url: API_BASE_URL + '/api/problems',
    method: 'GET',
  });
}

export function createProblem(payload) {
  return request({
    url: API_BASE_URL + '/api/problem/create',
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
